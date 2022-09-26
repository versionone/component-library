const { createFilePath } = require('gatsby-source-filesystem');

module.exports.onCreateWebpackConfig = ({ actions, plugins, stage }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      optimization: {
        minimizer: [
          plugins.minifyJs({
            terserOptions: {
              ecma: 5,
            },
          }),
          plugins.minifyCss(),
        ],
      },
    });
  }
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['main:src', 'main'],
    },
    //https://github.com/gatsbyjs/gatsby/issues/26785
    module: {
      rules: [
          {
              test: require.resolve(`@gatsbyjs/reach-router/index`),
              type: `javascript/auto`,
              use: [
                  {
                      loader: require.resolve(`./reach-router-add-basecontext-export-loader`),
                  },
              ],
          },
      ],
    },
  });
};

module.exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@versionone/babel-plugin-react-docgen',
    resolve: require.resolve('@versionone/babel-plugin-react-docgen'),
    options: {
      additionalHandlers: [
        '@versionone/theme-definition-handler',
        'react-docgen-deprecation-handler',
      ],
    },
  });
  // TODO: is this needed?
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-class-properties',
  });
  // TODO: is this needed?
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-arrow-functions',
  });
  // TODO: is this needed?
  // actions.setBabelPlugin({
  //   name: 'babel-plugin-prismjs',
  //   options: {
  //     languages: ['js', 'jsx', 'markdown', 'bash'],
  //   },
  // });
  // TODO: is this needed?
  actions.setBabelPreset({
    name: `@babel/preset-env`,
    options: {
      loose: true,
      modules: false,
      useBuiltIns: `entry`,
      targets: ['ie >= 11'],
    },
  });
};

const componentExpression = /(\/src|\/README)/g;
module.exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    let value = createFilePath({ node, getNode });
    if (componentExpression.test(value)) {
      value = `/components${value.replace(componentExpression, '')}`;
    }

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

module.exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fileAbsolutePath
                  frontmatter {
                    name
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        return result.data.allMdx.edges.map(({ node }) =>
          createPage({
            path: node.fields.slug,
            component: node.fileAbsolutePath,
            context: {
              id: node.id,
              name: node.frontmatter.name,
            },
          }),
        );
      }),
    );
  });
};
