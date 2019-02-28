const React = require('react');
const { getRenderer } = require('@versionone/components');
const { rehydrate } = require('fela-dom');
// require('./src/css/prism.css');
// TODO: Is this still needed in combination with polyfill gatsby plugin?
require('babel-polyfill');

module.exports.wrapRootElement = ({ element }) => {
  const renderer = getRenderer({});
  rehydrate(renderer);
  return element;
};
