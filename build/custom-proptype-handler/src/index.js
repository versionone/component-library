const customPropTypeHandler = require('./customPropTypeHandler');
const customPropTypeDocBlockHandler = require('./customPropTypeDocBlockHandler');
const defaultValuesHandler = require('./defaultValuesHandler');

module.exports = (propName, defaultValuePropName) => {
  return [
    customPropTypeHandler(propName),
    customPropTypeDocBlockHandler(propName),
    defaultValuePropName
      ? defaultValuesHandler(defaultValuePropName, propName)
      : undefined,
  ].filter(Boolean);
};
