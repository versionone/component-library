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
      command = './netlifyctl -A "$NETLIFY_TOKEN" deploy --prod';
    } else {
      command = './netlifyctl -A "$NETLIFY_TOKEN" deploy --draft';
    }
    return Promise.resolve(
      shell
        .exec(command)
        .grep('https.*.com$')
        .stdout.replace(/^[\s\n\t]*/g, ''),
    );
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
