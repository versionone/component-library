module.exports = {
  babelrcRoots: ['.', 'packages/*', 'build/*'],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-transform-react-fela-display-name',
    '@babel/plugin-proposal-class-properties',
    'transform-es2015-modules-umd',
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
