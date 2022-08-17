import { styled } from '@styles/stitches'
import PostListItem from '@components/PostListItem'
import App from '@components/App'
import Author from '@components/Author'
import React, { useMemo } from 'react'
import { graphql, PageProps } from 'gatsby'
import { Post } from '@models/post'
import SEO from '@components/SEO'

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
          }
        }
      }
    }
  }
`

interface Response {
  allMdx: {
    edges: Array<{ node: Post }>
  }
}

export default function Home({ data: { allMdx } }: PageProps<Response>) {
  const posts = useMemo(() => allMdx.edges.map((edge) => edge.node), [])

  return (
    <App>
      <Main>
        <Header>
          <Title>
            명시지 <Token>明示知</Token>
          </Title>
          <Paragraph>기록할 수 있는 지식을 나눕니다</Paragraph>
          <Author />
        </Header>
        <List>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </List>
      </Main>
    </App>
  )
}

export function Head() {
  return <SEO />
}

const Main = styled('main', {
  maxWidth: 1000,
  padding: '100px 24px',
  margin: '0 auto',
  '@media screen and (max-width: 1000px)': {
    padding: '60px 24px',
  },
})

const Header = styled('header', {
  marginBottom: 24,
})

const Title = styled('h1', {
  color: '$gray700',
  fontSize: '1.75rem',
  fontWeight: 600,
  margin: 0,
})

const Token = styled('span', {
  color: '$gray500',
  fontSize: '1.25rem',
})

const Paragraph = styled('p', {
  margin: 0,
  marginTop: 6,
  color: '$gray600',
  fontWeight: 300,
  fontSize: '1rem',
})

const List = styled('ul', {
  margin: 0,
  padding: 0,
})
