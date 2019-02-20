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
    if (process.env.NEXT) {
      shell.echo('Publishing release (next) to NPM...');
      shell.exec('monorepo-utils-publish --ci -dist-tag next --dry');
    } else {
      shell.echo('Publishing release (next) to NPM...');
      shell.exec('monorepo-utils-publish --ci --dry');
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