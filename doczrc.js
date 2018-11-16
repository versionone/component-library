const pkg = require('./package.json');

export default {
  description: pkg.description,
  title: 'Component Library',
  menu: [
    {
      name: 'Getting Started',
      menu: ['Start Here'],
    },
    {
      name: 'Components',
    },
    {
      name: 'Other Packages',
      menu: ['StyleProvider', 'StyleContainer'],
    },
  ],
  wrapper: '@versionone/style-provider/src/StyleProvider.js',
  modifyBundlerConfig: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ['main:src', 'main'],
    },
  }),
  modifyBabelRc: config => ({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: config.plugins.concat([
      [
        '@versionone/babel-plugin-react-docgen',
        {
          additionalHandlers: [
            '@versionone/theme-definition-handler',
            'react-docgen-deprecation-handler',
          ],
        },
      ],
    ]),
  }),
};
