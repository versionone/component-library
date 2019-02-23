const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['main:src', 'main'],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode }).replace(
      /\/(README|src)/g,
      '',
    );

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
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

        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.join(
              __dirname,
              'src',
              'components',
              'containers',
              'MdxLayout.js',
            ),
            context: { id: node.id },
          });
        });
      }),
    );
  });
};
