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
    shell.exec('yarn build:website');
    shell.exec(
      'wget -qO- "https://cli.netlify.com/download/latest/linux" | tar xz',
    );
    let command;
    if (process.env.PROD) {
      command = './netlifyctl -A "$NETLIFY_TOKEN" deploy';
    } else {
      command = './netlifyctl -A "$NETLIFY_TOKEN" deploy --draft';
    }
    return Promise.resolve(
      shell
        .exec(command)
        .grep('https.*.com$')
        .stdout.replace(/^\s*/, ''),
    );
  })
  .then(url => updateStatus({ ...status, state: 'success', url }))
  .then(shell.exit(0))
  .catch(() => {
    updateStatus({ ...status, state: 'failure' });
    shell.exit(1);
  });
