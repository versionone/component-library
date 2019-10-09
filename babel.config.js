module.exports = {
  babelrcRoots: ['.', 'packages/*', 'build/*'],
  presets: [ ['@babel/preset-env', {modules: false} ], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-transform-react-fela-display-name',
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'wrap',
        ignoreFilenames: ['node_modules'],
      },
    ],
    'babel-plugin-dev-expression',
  ],
};
