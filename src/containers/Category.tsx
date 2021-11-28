import { graphql } from 'gatsby'
import { FixedObject } from 'gatsby-image'
import React from 'react'
import Page from '../containers/Page'
import PostItem from '../components/PostItem'
import NavBar from '../components/NavBar'
import { globalReset } from '../styles/global'
import { styled } from '../styles/stitches'

interface Post {
  id: string
  frontmatter: {
    title: string
    summary: string
    thumbnail: {
      childImageSharp: {
        fixed: FixedObject
      }
    }
  }
  fields: {
    slug: string
  }
}

interface Response {
  allMdx: {
    edges: Array<{
      node: Post
    }>
  }
}

export const pageQuery = graphql`
  query($category: String!) {
    allMdx(
      filter: { frontmatter: { category: {eq: $category } } },
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            thumbnail {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

interface Props {
  data: Response
}

export default function Category({ data: { allMdx } }: Props) {
  globalReset()

  return (
    <Page>
      <Main>
        <NavBar />
        <PostList>
          {allMdx.edges.map(({ node }) => (
            <PostItem
              key={node.id}
              href={node.fields.slug}
              title={node.frontmatter.title}
              description={node.frontmatter.summary}
              thumbnail={node.frontmatter.thumbnail.childImageSharp.fixed}
            />
          ))}
        </PostList>
      </Main>
    </Page>
  )
}

const Main = styled('main', {
  minHeight: '100%',
  fontFamily: "'Noto Serif KR', serf",
  paddingBottom: 'calc(60px + env(safe-area-inset-bottom, 0))',
  '@media(max-width: 600px)': {
    padding: '30px',
    paddingBottom: 'calc(30px + env(safe-area-inset-bottom, 0))',
  },
})

const PostList = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  maxWidth: 800,
  margin: '0 auto',
  gridRowGap: '35px',
  gridColumnGap: '15px',
})
