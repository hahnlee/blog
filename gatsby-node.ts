import * as path from 'path'
import type { GatsbyNode, Node } from 'gatsby'
import assert from 'assert'
import readingTime from 'reading-time'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src', 'components'),
        '@hooks': path.resolve(__dirname, 'src', 'hooks'),
        '@styles': path.resolve(__dirname, 'src', 'styles'),
        '@models': path.resolve(__dirname, 'src', 'models'),
      },
    },
  })
}

// 모든 글의 date는 +09:00 기준으로 작성되어 있으므로, 슬러그 연도도 한국 시간 기준으로 계산한다.
const yearFormatter = new Intl.DateTimeFormat('en', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
})

function getYear(date: string | Date) {
  return yearFormatter.format(new Date(date))
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    assert(node.parent != null, 'Node에는 parent가 있어야합니다')
    const mdxNode = node as Node & { frontmatter: { date: string | Date } }

    const parent = getNode(node.parent)
    assert(parent != null, 'Node에는 parent가 있어야합니다')

    createNodeField({
      node,
      name: 'slug',
      value: `/${getYear(mdxNode.frontmatter.date)}/${parent.relativeDirectory}`,
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
      type Mdx implements Node {
        timeToRead: Int!
      }
    `)
  }

export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
}) => {
  createResolvers({
    Mdx: {
      timeToRead: {
        type: 'Int!',
        resolve: (source: { body?: string }) =>
          Math.max(1, Math.ceil(readingTime(source.body ?? '').minutes)),
      },
    },
  })
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql<{
    allMdx: {
      nodes: Array<{
        fields: { slug: string }
        internal: { contentFilePath: string }
      }>
    }
  }>(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  const template = path.resolve(__dirname, 'src', 'containers', 'Post.tsx')

  result.data!.allMdx.nodes.forEach(({ fields: { slug }, internal }) => {
    createPage({
      path: slug,
      component: `${template}?__contentFilePath=${internal.contentFilePath}`,
      context: {
        slug,
      },
    })
  })
}
