module.exports = function getPropDescriptor(propName) {
  return function getDescriptor(property) {
    let propDescriptor = this._data.get(propName)[property];
    if (!propDescriptor) {
      propDescriptor = {};
      this._data.get(propName)[property] = propDescriptor;
    }
    return propDescriptor;
  };
};
