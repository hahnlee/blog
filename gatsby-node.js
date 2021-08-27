const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: 'slug',
      value: `/${node.frontmatter.date.split('-')[0]}/${
        parent.relativeDirectory
      }`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    const posts = result.data.allMdx.edges

    posts.forEach(
      ({
        node: {
          fields: { slug },
        },
      }) => {
        createPage({
          path: slug,
          component: path.resolve(__dirname, 'src', 'containers', 'Post.tsx'),
          context: {
            slug,
          },
        })
      }
    )
  })
}
