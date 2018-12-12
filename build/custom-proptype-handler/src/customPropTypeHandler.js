const getPropType = require('react-docgen/dist/utils/getPropType');
const getPropertyName = require('react-docgen/dist/utils/getPropertyName');
const isReactModuleName = require('react-docgen/dist/utils/isReactModuleName');
const getMemberValuePath = require('react-docgen/dist/utils/getMemberValuePath');
const printValue = require('react-docgen/dist/utils/printValue');
const recast = require('recast');
const resolveToModule = require('react-docgen/dist/utils/resolveToModule');
const resolveToValue = require('react-docgen/dist/utils/resolveToValue');
const isRequiredPropType = require('react-docgen/dist/utils/isRequiredPropType');
const getPropDescriptor = require('./getCustomPropDescriptor');

const {
  types: { namedTypes: types },
} = recast;

function isPropTypesExpression(path) {
  const moduleName = resolveToModule.default(path);
  if (moduleName) {
    return (
      isReactModuleName.default(moduleName) || moduleName === 'ReactPropTypes'
    );
  }
  return false;
}

function amendPropTypes(getDescriptor, path) {
  if (!types.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    // eslint-disable-next-line default-case
    switch (propertyPath.node.type) {
      case types.Property.name: {
        const propDescriptor = getDescriptor(
          getPropertyName.default(propertyPath),
        );
        const valuePath = propertyPath.get('value');
        const type = isPropTypesExpression(valuePath)
          ? getPropType.default(valuePath)
          : { name: 'custom', raw: printValue.default(valuePath) };

        if (type) {
          propDescriptor.type = type;
          propDescriptor.required =
            type.name !== 'custom' && isRequiredPropType.default(valuePath);
        }
        break;
      }
      case types.SpreadElement.name: {
        const resolvedValuePath = resolveToValue.default(
          propertyPath.get('argument'),
        );
        // eslint-disable-next-line default-case
        switch (resolvedValuePath.node.type) {
          case types.ObjectExpression.name: // normal object literal
            amendPropTypes(getDescriptor, resolvedValuePath);
            break;
        }
        break;
      }
    }
  });
}

function getPropTypeHandler(propName) {
  return function customPropTypeHandler(documentation, path) {
    let propTypesPath = getMemberValuePath.default(path, propName);
    if (!propTypesPath) {
      return;
    }
    propTypesPath = resolveToValue.default(propTypesPath);
    if (!propTypesPath) {
      return;
    }
    documentation.set(propName, {});
    amendPropTypes(
      getPropDescriptor(propName).bind(documentation),
      propTypesPath,
    );
  };
}

module.exports = getPropTypeHandler;
