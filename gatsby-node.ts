import * as path from 'path'
import type { GatsbyNode, Node } from 'gatsby'
import assert from 'assert'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    assert(node.parent != null, 'Node에는 parent가 있어야합니다')
    const mdxNode = node as Node & { frontmatter: { date: string } }

    const parent = getNode(node.parent)
    assert(parent != null, 'Node에는 parent가 있어야합니다')

    if (parent) {
      createNodeField({
        node,
        name: 'slug',
        value: `/${mdxNode.frontmatter.date.split('-')[0]}/${
          parent.relativeDirectory
        }`,
      })
    }
  }
}

export const createPages: GatsbyNode['createPages'] = ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const createPosts = graphql<{
    allMdx: { edges: Array<{ node: { fields: { slug: string } } }> }
  }>(`
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
    const posts = result.data!.allMdx.edges

    posts.forEach(
      ({
        node: {
          fields: { slug },
        },
      }) => {
        createPage({
          path: slug,
          component: path.resolve(
            __dirname,
            'src',
            'containers',
            'Post.tsx',
          ),
          context: {
            slug,
          },
        })
      }
    )
  })

  return createPosts
}
