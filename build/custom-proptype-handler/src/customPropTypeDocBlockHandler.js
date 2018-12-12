const recast = require('recast');
const getPropertyName = require('react-docgen/dist/utils/getPropertyName')
  .default;
const getMemberValuePath = require('react-docgen/dist/utils/getMemberValuePath')
  .default;
const resolveToValue = require('react-docgen/dist/utils/resolveToValue')
  .default;
const { getDocblock } = require('react-docgen/dist/utils/docBlock');
const getPropDescriptor = require('./getCustomPropDescriptor');

const {
  types: { namedTypes: types },
} = recast;

const setPropDescription = (propName, documentation, propertyPath) => {
  const getDescriptor = getPropDescriptor(propName).bind(documentation);
  const propDescriptor = getDescriptor(getPropertyName(propertyPath));

  if (propDescriptor.description) {
    return;
  }
  propDescriptor.description = getDocblock(propertyPath) || '';
};

function resolveDocumentation(propName, documentation, path) {
  if (!types.ObjectExpression.check(path.node)) {
    return;
  }

  path.get('properties').each(propertyPath => {
    if (types.Property.check(propertyPath.node)) {
      setPropDescription(propName, documentation, propertyPath);
    } else if (types.SpreadElement.check(propertyPath.node)) {
      const resolvedValuePath = resolveToValue(propertyPath.get('argument'));
      resolveDocumentation(propName, documentation, resolvedValuePath);
    }
  });
}

module.exports = function customPropTypeDocBlockHandler(propName) {
  return function propDocBlockHandler(documentation, path) {
    let propTypesPath = getMemberValuePath(path, propName);
    if (!propTypesPath) {
      return;
    }
    propTypesPath = resolveToValue(propTypesPath);
    if (!propTypesPath) {
      return;
    }
    resolveDocumentation(propName, documentation, propTypesPath);
  };
};
