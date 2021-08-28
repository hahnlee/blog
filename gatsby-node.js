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

  const createPosts = graphql(`
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

  const createCategories = graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            category
          }
        }
        distinct(field: frontmatter___category)
      }
    }
  `).then((result) => {
    const categories = result.data.allMdx.distinct
    categories.forEach((category) => {
      createPage({
        path: `/categories/${category}`,
        component: path.resolve(__dirname, 'src', 'containers', 'Category.tsx'),
        context: {
          category,
        },
      })
    })
  })

  return Promise.all([createPosts, createCategories])
}
