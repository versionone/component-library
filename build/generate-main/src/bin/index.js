#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('path');
const fs = require('fs').promises;

const cwd = process.cwd();
const pkg = require(`${cwd}/package.json`);
const mainFile = pkg['main:src'];
const [mainFileName, ...reversedPath] = mainFile.split('/').reverse();
const mainFilePath = reversedPath.reverse();
const inputDirectory = path.join(cwd, ...mainFilePath);
require("@babel/register")({
  plugins: [
      ["@babel/plugin-transform-react-jsx"],
      ['@babel/plugin-proposal-class-properties'],
  ]
});
require = require("esm")(module)

fs.readdir(inputDirectory)
  .then(items =>
    items
      .filter(item => item !== mainFileName)
      .map(dirName => {
        const moduleToExport = require(path.join(inputDirectory, dirName));
        const moduleExports = Object.keys(moduleToExport);
        return `export { ${moduleExports.join(', ')} } from './${dirName}';`
      }),
  )
  .then(componentExportDeclarations =>
    fs.writeFile(
      path.join(cwd, mainFile),
      componentExportDeclarations
        .reduce((acc, next) => acc.concat(next), [])
        .join('\n'),
      'utf8',
    ),
  )
  .then(() => process.exit(0))
  .catch(e => {
    /* eslint-disable-next-line no-console */
    console.error(e);
    process.exit(1);
  });
