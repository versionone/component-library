const path = require('path');
const versiononeRehype = require('@versionone/rehype-playground-plugin');
const { version } = require('../../lerna.json');

module.exports = {
  siteMetadata: {
    title: `VersionOne Components v${version}`,
    description: '',
    author: '@versionone',
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
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
        hastPlugins: [versiononeRehype()],
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
        name: `mdx-stand-alone-pages`,
        path: path.join(__dirname, '..', '..', 'docs'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `component-stand-alone-pages`,
        path: path.join(__dirname, '..', 'components', 'src'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `icons-stand-alone-pages`,
        path: path.join(__dirname, '..', 'icons', 'src'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-default-mdx-basic',
        short_name: 'starter',
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
