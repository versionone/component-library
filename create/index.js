const fs = require('fs');
const path = require('path');
const replaceInFiles = require('replace-in-files');
const copy = require('recursive-copy');

const args = process.argv.slice(2);
const name = args[0];

if (!name) throw new Error('You must provide the name of the new component');
else console.log(`We will create a component named ${name}`);

create(name);

function create(componentName) {
  const tempaltePath = path.resolve('template');
  const componentsPath = path.resolve('..', 'packages', 'components', 'src');

  const componentPath = path.resolve(componentsPath, componentName);
  const indexPath = path.resolve(componentPath, 'index.js');
  const implPath = path.resolve(componentPath, 'Component.js');
  const specPath = path.resolve(componentPath, 'Component.spec.js');
  const namedImplPath = path.resolve(componentPath, `${componentName}.js`);
  const namedSpecPath = path.resolve(componentPath, `${componentName}.spec.js`);
  const readmePath = path.resolve(componentPath, 'README.mdx');

  const replacementOptions = {
    files: [
      indexPath,
      implPath,
      specPath,
      readmePath,
    ],
    from: /PLACEHOLDER/g,
    to: componentName,
  };

  const rename = (source, dest) =>  new Promise(
    (resolve, reject) => fs.rename(source, dest, (err) => err ? reject(err) : resolve())
  );

  copy(tempaltePath, componentPath)
    .then(() => replaceInFiles(replacementOptions))
    .then(() => rename(implPath, namedImplPath))
    .then(() => rename(specPath, namedSpecPath))
    .then(() => console.log('done'))
    .catch(console.error);
}
