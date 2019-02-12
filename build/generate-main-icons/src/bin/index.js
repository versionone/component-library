#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const cwd = process.cwd();
const inputDirectory = path.join(cwd, 'src');

fsPromises
  .readdir(inputDirectory)
  .then(items =>
    items
      .filter(
        item =>
          fs.lstatSync(path.join(inputDirectory, item)).isFile() &&
          path.extname(item) === '.js',
      )
      .map(item => {
        const name = path.basename(item, path.extname(item));
        return `export { default as ${name}Icon } from './${name}'`;
      }),
  )
  .then(componentExportDeclarations =>
    fsPromises.writeFile(
      path.join(cwd, 'src', 'index.js'),
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
