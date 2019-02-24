const shell = require('shelljs');
const cypress = require('cypress');
const updateStatus = require('../updateStatus');

const exp = /localhost/;
const status = {
  description: 'Cypress Tests',
  context: 'Verify/Testing',
};

updateStatus({
  ...status,
  state: 'pending',
}).then(
  () =>
    new Promise((resolve, reject) => {
      shell.exec(`yarn add -W --dev cypress`);
      const child = shell.exec('yarn start', { async: true });
      child.stdout.on('data', data => {
        if (exp.test(data)) {
          cypress
            .run({
              record: true,
              key: process.env.CYPRESS_RECORD_KEY,
            })
            .then(({ runUrl, totalFailed, totalPassed }) => {
              if (totalFailed === 0) {
                updateStatus({
                  ...status,
                  state: 'success',
                  description: `Passed: ${totalPassed}`,
                  url: runUrl,
                }).then(() => shell.exit(0));
              } else {
                updateStatus({
                  ...status,
                  description: `Failed: ${totalFailed}`,
                  url: runUrl,
                  state: 'failure',
                }).then(() => shell.exit(1));
              }
            })
            .catch(error => {
              updateStatus({
                ...status,
                description: error,
                state: 'error',
              }).then(() => shell.exit(1));
            });
        }
      });
      child.on('exit', exitCode => {
        if (exitCode > 0) {
          updateStatus({
            ...status,
            description: `Exit code ${exitCode}`,
            state: 'error',
          }).then(() => shell.exit(exitCode));
        }
      });
    }),
);
