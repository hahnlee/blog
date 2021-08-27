import { styled, global } from '@stitches/react'
import { useStaticQuery, graphql } from 'gatsby'
import { FixedObject } from 'gatsby-image'
import React from 'react'
import Header from '../components/Header'
import PostItem from '../components/PostItem'
import SideBar from '../components/SideBar'

interface Post {
  id: string
  frontmatter: {
    title: string
    summary: string
    thumbnail: {
      childImageSharp: {
        fixed: FixedObject;
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
  globalStyle()

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
    <Main>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <Header />
      <SideBar />
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
  )
}

const globalStyle = global({
  html: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  body: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  ___gatsby: {
    width: '100%',
    height: '100%',
  },
})

const Main = styled('main', {
  padding: '60px',
  height: '100%',
  fontFamily: "'Noto Serif KR', serf",
})

const PostList = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginTop: 150,
  marginLeft: 200,
  gridRowGap: '30px',
})
