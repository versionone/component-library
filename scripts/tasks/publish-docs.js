const shell = require('shelljs');
const updateStatus = require('../updateStatus');

const status = {
  description: 'Publish Docs',
  context: 'Publish/Docs',
};
const urlExp = /https.*\.com$/;

updateStatus({
  ...status,
  state: 'pending',
})
  .then(() => {
    shell.exec('npm install -g netlify-cli@next');
    shell.exec('yarn build:website');

    let command;
    command = `NETLIFY_AUTH_TOKEN="${
      process.env.NETLIFY_TOKEN
    }" netlify deploy --dir .docz/dist ${process.env.PROD ? '--prod' : ''}`;

    const commandOutput = shell
      .exec(command)
      .grep('versionone-components.netlify.com').stdout;
    const url = urlExp.exec(commandOutput)[0];

    return new Promise((resolve, reject) => {
      if (url) {
        resolve(url);
      }
      reject('No URL');
    });
  })
  .then(url =>
    updateStatus({
      ...status,
      description: 'Docs published',
      state: 'success',
      url,
    }),
  )
  .then(() => {
    shell.exit(0);
  })
  .catch(error => {
    updateStatus({
      ...status,
      description: error,
      state: 'failure',
    }).then(() => shell.exit(1)); // TODO: exit 1 when linting fails build
  });
