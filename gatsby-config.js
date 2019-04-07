const path = require('path')


const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  siteMetadata: {
    title: 'Han Lee',
    description: '이한의 개발 블로그',
    siteUrl: 'https://blog.hanlee.io',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve(srcPath, 'pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-figure-caption',
          'gatsby-remark-images',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'posts')
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-111601591-4',
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
  ],
}
