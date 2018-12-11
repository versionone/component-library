const path = require('path');
const pkg = require('./package.json');

export default {
  description: pkg.description,
  title: 'Component Library',
  menu: [
    {
      name: 'Getting Started',
      menu: [
        'Start Here',
        'Contributing Content',
        'Developer Guide',
        'Implement Components',
        'Document Components',
      ],
    },
    {
      name: 'Layout',
    },
    {
      name: 'Other Components',
      menu: ['StyleProvider', 'StyleContainer'],
    },
  ],
  modifyBundlerConfig: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ['main:src', 'main'],
      alias: {
        ...config.resolve.alias,
        '@versionone/components': path.join(
          __dirname,
          'packages',
          'components',
          'src',
        ),
      },
    },
  }),
  modifyBabelRc: () => ({
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
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-transform-react-fela-display-name',
      [
        'babel-plugin-transform-react-remove-prop-types',
        {
          mode: 'wrap',
          ignoreFilenames: ['node_modules'],
        },
      ],
      'babel-plugin-dev-expression',
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
  }),
};
