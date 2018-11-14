const Path = require('path');
const _ = require('lodash');
const ReactDocgen = require('react-docgen');
const reactDocgenHandlers = require('react-docgen/dist/handlers');
const actualNameHandler = require('./actualNameHandler');

const defaultHandlers = Object.values(reactDocgenHandlers).map(
  handler => handler,
);
const handlers = [...defaultHandlers, actualNameHandler];

module.exports = function plugin({ types: t }) {
  return {
    visitor: {
      Program: {
        exit(path, state) {
          injectReactDocgenInfo(path, state, this.file.code, t);
        },
      },
    },
  };
};

function injectReactDocgenInfo(path, state, code, t) {
  const program = path.scope.getProgramParent().path;

  let docgenResults = [];
  try {
    let resolver = ReactDocgen.resolver.findAllExportedComponentDefinitions;
    if (state.opts.resolver) {
      resolver = ReactDocgen.resolver[state.opts.resolver];
    }
    const additionalHandlers = (state.opts.additionalHandlers || [])
      .map(require.resolve)
      .map(require)
      .reduce(
        (acc, handler) =>
          Array.isArray(handler) ? acc.concat(handler) : acc.concat([handler]),
        [],
      );

    docgenResults = ReactDocgen.parse(
      code,
      resolver,
      handlers.concat(additionalHandlers),
    );

    if (state.opts.removeMethods) {
      docgenResults.forEach(result => {
        // eslint-disable-next-line no-param-reassign
        delete result.methods;
      });
    }
  } catch (e) {
    // this is for debugging the error only, do not ship this console log or else it pollutes the webpack output
    // console.log(e);
    return;
  }

  docgenResults.forEach(docgenResult => {
    const exportName = docgenResult.actualName;

    // If the result doesn't have an actualName,
    // it's probably on arrow functions.
    if (!exportName) {
      return;
    }

    const docNode = buildObjectExpression(docgenResult, t);
    const docgenInfo = t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(exportName),
          t.identifier('__docgenInfo'),
        ),
        docNode,
      ),
    );
    program.pushContainer('body', docgenInfo);

    injectDocgenGlobal(exportName, path, state, t);
  });
}

function injectDocgenGlobal(className, path, state, t) {
  const program = path.scope.getProgramParent().path;

  if (!state.opts.DOC_GEN_COLLECTION_NAME) {
    return;
  }

  const globalName = state.opts.DOC_GEN_COLLECTION_NAME;
  const filePath = Path.relative(
    './',
    Path.resolve('./', path.hub.file.opts.filename),
  );
  const globalNode = t.ifStatement(
    t.binaryExpression(
      '!==',
      t.unaryExpression('typeof', t.identifier(globalName)),
      t.stringLiteral('undefined'),
    ),
    t.blockStatement([
      t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.identifier(globalName),
            t.stringLiteral(filePath),
            true,
          ),
          t.objectExpression([
            t.objectProperty(t.identifier('name'), t.stringLiteral(className)),
            t.objectProperty(
              t.identifier('docgenInfo'),
              t.memberExpression(
                t.identifier(className),
                t.identifier('__docgenInfo'),
              ),
            ),
            t.objectProperty(t.identifier('path'), t.stringLiteral(filePath)),
          ]),
        ),
      ),
    ]),
  );
  program.pushContainer('body', globalNode);
}

function buildObjectExpression(obj, t) {
  if (_.isPlainObject(obj)) {
    const children = [];
    for (const key in obj) {
      if (key !== 'actualName' && !(!(key in obj) || _.isUndefined(obj[key]))) {
        children.push(
          t.objectProperty(
            t.stringLiteral(key),
            buildObjectExpression(obj[key], t),
          ),
        );
      }
    }
    return t.objectExpression(children);
  }
  if (_.isString(obj)) {
    return t.stringLiteral(obj);
  }
  if (_.isBoolean(obj)) {
    return t.booleanLiteral(obj);
  }
  if (_.isNumber(obj)) {
    return t.numericLiteral(obj);
  }
  if (_.isArray(obj)) {
    const children = [];
    obj.forEach(val => {
      children.push(buildObjectExpression(val, t));
    });
    return t.ArrayExpression(children);
  }
  if (_.isNull(obj)) {
    return t.nullLiteral();
  }
  return null;
}
