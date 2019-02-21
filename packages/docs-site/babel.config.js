module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      '@versionone/babel-plugin-react-docgen',
      {
        additionalHandlers: [
          '@versionone/theme-definition-handler',
          'react-docgen-deprecation-handler',
        ],
      },
    ],
  ],
};
