import { styled } from '@stitches/react'
import { graphql } from 'gatsby'
import { FixedObject } from 'gatsby-image'
import React from 'react'
import Page from '../containers/Page'
import PostItem from '../components/PostItem'
import NavBar from '../components/NavBar'
import { globalReset } from '../styles/global'

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
                fixed(width: 250, height: 250) {
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
  padding: '60px',
  minHeight: '100%',
  fontFamily: "'Noto Serif KR', serf",
  '@media(max-width: 600px)': {
    padding: '30px',
  },
})

const PostList = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginTop: 150,
  marginLeft: 200,
  gridRowGap: '35px',
  gridColumnGap: '15px',
  '@media(max-width: 800px)': {
    gridTemplateColumns: '1fr',
  },
  '@media(max-width: 600px)': {
    margin: '0 auto',
  },
})