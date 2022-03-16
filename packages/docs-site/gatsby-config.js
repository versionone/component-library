const path = require('path');
const versiononePlaygroundPlugin = require('@versionone/rehype-playground-plugin');
const { version } = require('../../lerna.json');
const { description } = require('../../package.json');

module.exports = {
  siteMetadata: {
    title: `VersionOne Components v${version}`,
    description,
    author: '@versionone',
    navigationOrder: [
      {
        name: 'Getting Started',
        pages: [
          'Start Here',
          'Contributing Content',
          'Developer Guide',
          'Implement Components',
          'Document Components',
        ],
      },
      {
        name: 'Guides',
        pages: ['Analytics Tracking', 'Focus and Tabbing'],
      },
      {
        name: 'Icons',
        pages: [],
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [
          '@versionone/components',
          '@versionone/doc-components',
          '@versionone/icons',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: path.join(
            __dirname,
            'src',
            'components',
            'containers',
            'MdxLayout.js',
          ),
        },
        rehypePlugins: [
          versiononePlaygroundPlugin()
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 900,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `doc-pages`,
        path: path.join(__dirname, '..', '..', 'docs'),
        ignore: ['**/*.js', '**/*.json'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `packages`,
        path: path.join(__dirname, '..', 'components'),
        ignore: ['**/*.js', '**/*.json'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `packages`,
        path: path.join(__dirname, '..', 'icons'),
        ignore: ['**/*.js', '**/*.json'],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: '@versionone/docs-site',
        short_name: 'docs-site',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
