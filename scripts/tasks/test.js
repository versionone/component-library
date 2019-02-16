const shell = require('shelljs');
const cypress = require('cypress');
const updateStatus = require('../updateStatus');

const exp = /localhost/;
const status = {
  description: 'Cypress Tests',
  context: 'Cypress/Test',
};

updateStatus({
  ...status,
  state: 'pending',
})
  .then(
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
              .then(results => results.runUrl)
              .then(url => {
                resolve(url);
              })
              .catch(error => {
                reject(error);
              });
          }
        });
      }),
  )
  .then(url => updateStatus({ ...status, state: 'success', url }))
  .then(() => {
    shell.exit(0);
  })
  .catch(error => {
    updateStatus({ ...status, state: 'failure' });
    shell.exit(1);
  });
