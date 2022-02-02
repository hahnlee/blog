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
            />
          ))}
        </PostList>
      </Main>
    </Page>
  )
}

const Main = styled('main', {
  minHeight: '100%',
  padding: '0 30px',
  paddingBottom: 'env(safe-area-inset-bottom, 0)',
  '@media(max-width: 600px)': {
    padding: '24px 16px',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0) + 16px)',
  },
})

const PostList = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  maxWidth: 800,
  margin: '20px auto',
  gridRowGap: '35px',
  gridColumnGap: '15px',
})
