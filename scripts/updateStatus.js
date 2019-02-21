const fetch = require('node-fetch');

module.exports = function updateStatus({ context, description, state, url }) {
  return fetch(
    `https://api.github.com/repos/versionone/component-library/statuses/${
      process.env.SHA
    }`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.GITHUB_USER}:${process.env.GITHUB_TOKEN}`,
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
        target_url: url,
        description,
        context,
      }),
    },
  )
    .then(res => res.json())
    .then(console.log);
};
