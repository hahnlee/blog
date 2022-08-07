import { styled } from '@styles/stitches'
import React from 'react'

export default function Author() {
  return (
    <Container>
      <Profile src="/images/profile.png" draggable={false} alt="" />
      <About>
        <Title>이한</Title>
        <Paragraph>Coding a Better World Together</Paragraph>
        <Link role="menuitem" href="https://hanlee.io">
          About
        </Link>
        <Link role="menuitem" href="https://github.com/hahnlee">
          GitHub
        </Link>
        <Link role="menuitem" href="/rss.xml">
          RSS
        </Link>
      </About>
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginTop: 24,
  backgroundColor: '$gray000',
  borderRadius: 16,
  padding: 16,
})

const Profile = styled('img', {
  width: 72,
  height: 72,
  borderRadius: '50%',
})

const About = styled('div', {
  flex: 1,
  marginLeft: 24,
})

const Title = styled('h2', {
  margin: 0,
  fontSize: '1.25rem',
  color: '$gray700',
  fontWeight: 600,
})

const Paragraph = styled('p', {
  margin: '6px 0',
  fontWeight: 400,
  color: '$gray600',
})

const Link = styled('a', {
  fontSize: '0.85rem',
  color: '$gray600',
  marginRight: 8,
})
