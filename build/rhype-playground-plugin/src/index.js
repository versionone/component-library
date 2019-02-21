const is = require('unist-util-is');
const flatten = require('lodash.flatten');
const nodeToString = require('hast-util-to-string');
const { jsx, imports } = require('docz-utils');
const { format } = require('docz-utils/lib/format');

const isPlayground = name => name === 'Playground';
const addPropsOnPlayground = (node, idx, scopes) => {
  const name = jsx.componentName(node.value);
  const tagOpen = new RegExp(`^\\<${name}`);

  if (isPlayground(name)) {
    return format(nodeToString(node)).then(formatted => {
      const code = formatted.slice(1, Infinity);
      const scope = `{props: this ? this.props : props,${scopes.join(',')}}`;
      const child = jsx.sanitizeCode(jsx.removeTags(code));
      node.value = node.value.replace(
        tagOpen,
        `<${name} __position={${idx}} __code={'${child}'} __scope={${scope}}`,
      );
    });
  }
  return Promise.resolve();
};

const addComponentsProps = scopes => (node, idx) =>
  addPropsOnPlayground(node, idx, scopes);

module.exports = () => () => tree => {
  const importNodes = tree.children.filter(node => is('import', node));
  const scopes = flatten(importNodes.map(imports.getImportsVariables));
  const nodes = tree.children
    .filter(node => is('jsx', node))
    .map(addComponentsProps(scopes));

  return Promise.all(nodes).then(() => tree);
};
