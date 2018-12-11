const getPropertyName = require('react-docgen/dist/utils/getPropertyName');
const getMemberValuePath = require('react-docgen/dist/utils/getMemberValuePath');
const printValue = require('react-docgen/dist/utils/printValue');
const recast = require('recast');
const resolveFunctionDefinitionToReturnValue = require('react-docgen/dist/utils/resolveFunctionDefinitionToReturnValue');
const resolveToValue = require('react-docgen/dist/utils/resolveToValue');
const isStatelessComponent = require('react-docgen/dist/utils/isStatelessComponent');

const {
  types: { namedTypes: types },
} = recast;

function getDefaultValue(path) {
  let { node } = path;
  let newPath = path;
  let defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(newPath.node)) {
      newPath = resolveToValue.default(newPath.get('right'));
    } else {
      newPath = resolveToValue.default(newPath);
    }
    if (types.ImportDeclaration.check(newPath.node)) {
      defaultValue = node.name;
    } else {
      // eslint-disable-next-line prefer-destructuring
      node = newPath.node;
      defaultValue = printValue(newPath);
    }
  }
  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node),
    };
  }

  return null;
}

function getStatelessPropsPath(componentDefinition) {
  return resolveToValue.default(componentDefinition).get('params', 0);
}

function getDefaultPropsPath(propName, componentDefinition) {
  let defaultValues = getMemberValuePath.default(componentDefinition, propName);
  if (!defaultValues) {
    return null;
  }

  defaultValues = resolveToValue.default(defaultValues);
  if (!defaultValues) {
    return null;
  }

  if (types.FunctionExpression.check(defaultValues.node)) {
    // Find the value that is returned from the function and process it if it is
    // an object literal.
    const returnValue = resolveFunctionDefinitionToReturnValue.default(
      defaultValues,
    );
    if (returnValue && types.ObjectExpression.check(returnValue.node)) {
      defaultValues = returnValue;
    }
  }
  return defaultValues;
}

function getDefaultValuesFromProps(
  propName,
  properties,
  documentation,
  isStateless,
) {
  properties
    .filter(propertyPath => types.Property.check(propertyPath.node))
    // Don't evaluate property if component is functional and the node is not an AssignmentPattern
    .filter(
      propertyPath =>
        !isStateless ||
        types.AssignmentPattern.check(propertyPath.get('value').node),
    )
    .forEach(propertyPath => {
      const propDescriptor = documentation._data.get(propName)[
        getPropertyName.default(propertyPath)
      ];
      const defaultValue = getDefaultValue(
        isStateless
          ? propertyPath.get('value', 'right')
          : propertyPath.get('value'),
      );
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    });
}

module.exports = function deafultValueHandler(propName) {
  return function defaultValuesHandler(documentation, componentDefinition) {
    let statelessProps = null;
    const defaultPropsPath = getDefaultPropsPath(propName, componentDefinition);
    if (isStatelessComponent.default(componentDefinition)) {
      statelessProps = getStatelessPropsPath(componentDefinition);
    }

    // Do both statelessProps and defaultProps if both are available so defaultProps can override
    if (statelessProps && types.ObjectPattern.check(statelessProps.node)) {
      getDefaultValuesFromProps(
        propName,
        statelessProps.get('properties'),
        documentation,
        true,
      );
    }
    if (
      defaultPropsPath &&
      types.ObjectExpression.check(defaultPropsPath.node)
    ) {
      getDefaultValuesFromProps(
        propName,
        defaultPropsPath.get('properties'),
        documentation,
        false,
      );
    }
  };
};
