#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('path');
const fs = require('fs').promises;
const babel = require('@babel/core');

const cwd = process.cwd();
const pkg = require(`${cwd}/package.json`);
const mainFile = pkg.main;
const [mainFileName, ...reversedPath] = mainFile.split('/').reverse();
const mainFilePath = reversedPath.reverse();
const outputDirectory = path.join(cwd, ...mainFilePath);
const outputFile = path.join(cwd, mainFile);

fs.readdir(outputDirectory)
  .then(items =>
    items
      .filter(item => item !== mainFileName)
      .map(dirName => {
        const dirPath = path.join(outputDirectory, dirName);
        const componentIndexPath = path.join(dirPath, 'index.js');
        const importedComponents = require(componentIndexPath);
        return Object.keys(importedComponents).map(
          componentName =>
            `export { default as ${componentName} } from './${dirName}';`,
        );
      }),
  )
  .then(componentExportDeclarations => {
    const indexSrcContents = componentExportDeclarations
      .reduce((acc, next) => acc.concat(next), [])
      .join('\n');
    const { code } = babel.transformSync(indexSrcContents, {
      rootMode: 'upward',
    });
    return fs.writeFile(outputFile, code, 'utf8');
  })
  .then(() => process.exit(0))
  .catch(e => {
    /* eslint-disable-next-line no-console */
    console.error(e);
    process.exit(1);
  });
