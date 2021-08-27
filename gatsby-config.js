const path = require('path')
const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'React',
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(srcPath, 'pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'posts'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-111601591-4',
      },
    },
  ],
}
