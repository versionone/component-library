const shell = require('shelljs');
const updateStatus = require('../updateStatus');

const errorNumberExp = /^\d*/;
const status = {
  description: 'Linting',
  context: 'Verify/Linting',
};

updateStatus({
  ...status,
  state: 'pending',
})
  .then(
    () =>
      new Promise((resolve, reject) => {
        const output = shell
          .exec('yarn lint')
          .grep('problems')
          .stdout.replace(/^.{2}/, '');
        const match = errorNumberExp.exec(output)[0];
        if (!match) {
          resolve();
        }
        const errorCount = parseInt(match);
        let message = 'error';
        if (errorCount > 1) {
          message = 'errors';
        }
        reject(`${errorCount} ${message}`);
      }),
  )
  .then(() =>
    updateStatus({
      ...status,
      description: 'Linting complete',
      state: 'success',
    }),
  )
  .then(() => {
    shell.exit(0);
  })
  .catch(error => {
    updateStatus({
      ...status,
      description: error,
      state: 'success',
    }).then(() => shell.exit(0)); // TODO: exit 1 when linting fails build
  });
