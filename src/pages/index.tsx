import { styled } from '@styles/stitches'
import PostListItem from '@components/PostListItem'
import App from '@components/App'
import Author from '@components/Author'
import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Post } from '@models/post'
import SEO from '@components/SEO'

export const pageQuery = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
          dateText
        }
        frontmatter {
          title
          summary
          date
        }
      }
    }
  }
`

interface Response {
  allMdx: {
    nodes: Post[]
  }
}

export default function Home({ data: { allMdx } }: PageProps<Response>) {
  return (
    <App>
      <Main>
        <Header>
          <Title>
            명시지 <Token>明示知</Token>
          </Title>
          <Paragraph>기록할 수 있는 지식을 나눕니다</Paragraph>
        </Header>
        <List>
          {allMdx.nodes.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </List>
        <Author />
      </Main>
    </App>
  )
}

export function Head() {
  return <SEO />
}

const Main = styled('main', {
  maxWidth: '$measure',
  padding: '120px 24px 80px',
  margin: '0 auto',
  '@media screen and (max-width: 720px)': {
    padding: '64px 24px 48px',
  },
})

const Header = styled('header', {
  marginBottom: 48,
  paddingBottom: 24,
  borderBottom: '1px solid $gray800',
})

const Title = styled('h1', {
  fontFamily: '$serif',
  color: '$gray900',
  fontSize: '2rem',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  margin: 0,
})

const Token = styled('span', {
  color: '$gray500',
  fontSize: '1.15rem',
  fontWeight: 400,
  marginLeft: 4,
})

const Paragraph = styled('p', {
  margin: '8px 0 0',
  color: '$gray600',
  fontSize: '0.95rem',
})

const List = styled('ul', {
  margin: 0,
  padding: 0,
})
