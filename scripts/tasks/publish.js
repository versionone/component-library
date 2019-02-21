const shell = require('shelljs');
const updateStatus = require('../updateStatus');

const status = {
  description: 'Publish to NPM',
  context: 'Publish/NPM',
};

updateStatus({
  ...status,
  state: 'pending',
})
  .then(
    () =>
      new Promise((resolve, reject) => {
        try {
          shell.exec('NODE_ENV=production yarn build');
          if (process.env.NEXT) {
            shell.echo('Publishing release (next) to NPM...');
            shell.exec(
              'yarn lerna version prerelease --yes --preid next -m "next release (%v)"',
            );
            shell.exec('yarn lerna publish --dist-tag next');
          } else {
            shell.echo('Publishing release to NPM...');
            shell.exec('yarn lerna publish');
          }
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }),
  )
  .then(() => updateStatus({ ...status, state: 'success' }))
  .then(() => {
    shell.exit(0);
  })
  .catch(error => {
    updateStatus({ ...status, state: 'failure' });
    shell.exit(1);
  });
