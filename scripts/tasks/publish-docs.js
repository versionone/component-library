const shell = require('shelljs');
const updateStatus = require('../updateStatus');

const status = {
  description: 'Publish Docs',
  context: 'Publish/Docs',
};

updateStatus({
  ...status,
  state: 'pending',
})
  .then(() => {
    shell.exec('npm install -g netlify-cli@^2.7.0');
    shell.exec('yarn build:website');

    const command = `netlify deploy -a "${
      process.env.NETLIFY_TOKEN
    }" --message "Deploy SHA: ${
      process.env.SHA
    }" -d ./packages/docs-site/public ${process.env.PROD ? '--prod' : ''}`;
    return new Promise((resolve, reject) => {
      try {
        const commandOutput = shell
          .exec(command)
          .grep('versionone-components.netlify.com').stdout;

        // remove colored CLI output (ESCAPE character, "\u001B", followed by ansi color code; e.g. "[39m")
        const cleanedOutput = commandOutput
          .replace(/\u001B\[[0-9;]*m/g, '')
          .trim();

        const url = /https.*\.com$/.exec(cleanedOutput)[0];
        resolve(url);
      } catch (error) {
        reject(error);
      }
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
    console.log(error);
    updateStatus({
      ...status,
      description: 'Failed to publish docs',
      state: 'failure',
    }).then(() => shell.exit(1)); // TODO: exit 1 when linting fails build
  });
