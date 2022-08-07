import type { GatsbyConfig } from 'gatsby'
import * as path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: '명시지(形式知)',
  },
  plugins: [
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, 'posts'),
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-remark-images',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              quality: 100,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
  ],
}

export default config
