const { getRenderer } = require('@versionone/components');
const { rehydrate } = require('fela-dom');
require('@babel/polyfill');

module.exports.wrapRootElement = ({ element }) => {
  const renderer = getRenderer({});
  rehydrate(renderer);
  return element;
};
