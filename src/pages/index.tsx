import { useStaticQuery, graphql } from 'gatsby'
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

export default function Home() {
  globalReset()

  const { allMdx } = useStaticQuery<Response>(graphql`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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
  `)

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
  paddingBottom: 'calc(60px + env(safe-area-inset-bottom, 0))',
  '@media(max-width: 600px)': {
    padding: '30px',
    paddingBottom: 'calc(30px + env(safe-area-inset-bottom, 0))',
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
