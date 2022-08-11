import { Post } from '@models/post'
import { styled } from '@styles/stitches'
import { Link } from 'gatsby'
import React from 'react'

interface Props {
  post: Post
}

export default function PostListItem({ post }: Props) {
  return (
    <Container>
      <ListItem to={post.fields.slug}>
        <Title>{post.frontmatter.title}</Title>
        <Summery>{post.frontmatter.summary}</Summery>
      </ListItem>
    </Container>
  )
}

const Container = styled('li', {
  listStyle: 'none',
  padding: '16px 0',
  borderBottom: '1px solid $gray100',
  '&:last-child': {
    border: 'none',
  },
})

const ListItem = styled(Link, {
  display: 'block',
  textDecoration: 'none',
  wordBreak: 'keep-all',
 })

const Title = styled('h1', {
  fontSize: '1.25rem',
  color: '$gray700',
  fontWeight: 600,
  margin: 0,
})

const Summery = styled('p', {
  margin: 0,
  marginTop: 6,
  color: '$gray600',
  fontWeight: 400,
})
