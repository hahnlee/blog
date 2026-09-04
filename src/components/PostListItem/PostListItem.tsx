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
      <Anchor to={post.fields.slug}>
        <Date dateTime={post.frontmatter.date}>{post.fields.dateText}</Date>
        <Title>{post.frontmatter.title}</Title>
        <Summary>{post.frontmatter.summary}</Summary>
      </Anchor>
    </Container>
  )
}

const Container = styled('li', {
  listStyle: 'none',
  margin: 0,
  padding: '28px 0',
  borderBottom: '1px solid $gray200',
  '&:last-child': {
    borderBottom: 'none',
  },
})

const Anchor = styled(Link, {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  wordBreak: 'keep-all',
})

const Date = styled('time', {
  display: 'block',
  fontSize: '0.8rem',
  color: '$gray500',
  letterSpacing: '0.02em',
  fontVariantNumeric: 'tabular-nums',
})

const Title = styled('h2', {
  fontFamily: '$serif',
  fontSize: '1.35rem',
  lineHeight: 1.4,
  color: '$gray900',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  margin: '6px 0 8px',
  transition: 'color 0.15s ease',
  [`${Anchor}:hover &`]: {
    color: '$gray600',
  },
})

const Summary = styled('p', {
  margin: 0,
  color: '$gray600',
  fontSize: '0.95rem',
  lineHeight: 1.7,
})
