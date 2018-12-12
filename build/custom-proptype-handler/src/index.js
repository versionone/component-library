const customPropTypeHandler = require('./customPropTypeHandler');
const defaultValuesHandler = require('./defaultValuesHandler');

module.exports = (propName, defaultValuePropName) => {
  return [
    customPropTypeHandler(propName),
    defaultValuePropName
      ? defaultValuesHandler(defaultValuePropName, propName)
      : undefined,
  ].filter(Boolean);
};
