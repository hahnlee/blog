import { Post } from '@models/post'
import { styled } from '@styles/stitches'
import { motion, TargetAndTransition } from 'framer-motion'
import { Link } from 'gatsby'
import React from 'react'

interface Props {
  post: Post
}

const HOVER_ANIMATION: TargetAndTransition = {
  scale: 0.98,
}

export default function PostListItem({ post }: Props) {
  return (
    <Container>
      <ListItem to={post.fields.slug}>
        <Motion whileHover={HOVER_ANIMATION}>
          <Title>{post.frontmatter.title}</Title>
          <Summery>{post.frontmatter.summary}</Summery>
        </Motion>
      </ListItem>
    </Container>
  )
}

const Container = styled('li', {
  listStyle: 'none',
  borderBottom: '1px solid $gray100',
  '&:last-child': {
    border: 'none',
  },
})

const ListItem = styled(Link, {
  display: 'block',
  textDecoration: 'none',
})

const Motion = styled(motion.div, {
  padding: 16,
  wordBreak: 'keep-all',
  '&:hover': {
    borderRadius: 12,
    backgroundColor: '$gray000',
  },
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
