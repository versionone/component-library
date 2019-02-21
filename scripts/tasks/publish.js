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
  .then(() => {
    shell.exec('echo "always-auth = true" >> .npmrc');
    shell.exec('echo "email = ${NPM_EMAIL}" >> .npmrc');
    shell.exec('echo "_auth = ${NPM_TOKEN}" >> .npmrc');
    shell.exec('NODE_ENV=production yarn build');
    if (process.env.NEXT) {
      shell.echo('Publishing release (next) to NPM...');
      shell.exec('yarn run monorepo-utils-publish --ci -dist-tag next');
    } else {
      shell.echo('Publishing release (next) to NPM...');
      shell.exec('yarn run monorepo-utils-publish --ci');
    }
  })
  .then(() => updateStatus({ ...status, state: 'success' }))
  .then(() => {
    shell.exit(0);
  })
  .catch(error => {
    updateStatus({ ...status, state: 'failure' });
    shell.exit(1);
  });
