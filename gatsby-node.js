const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: 'slug',
      value: `/${node.frontmatter.date.split('-')[0]}/${parent.relativeDirectory}/`,
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node: { fields: { slug } } }) => {
      createPage({
        path: slug,
        component: path.resolve(__dirname, 'src', 'templates', 'post.jsx'),
        context: {
          slug,
        },
      })
    })
  })
}
