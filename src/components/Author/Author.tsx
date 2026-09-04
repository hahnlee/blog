import { styled } from '@styles/stitches'
import React from 'react'

export default function Author() {
  return (
    <Container>
      <Profile src="/images/profile.png" draggable={false} alt="" />
      <Body>
        <Name>이한</Name>
        <Paragraph>Coding a Better World Together</Paragraph>
        <Links>
          <Link href="https://github.com/hahnlee">GitHub</Link>
          <Link href="/rss.xml">RSS</Link>
        </Links>
      </Body>
    </Container>
  )
}

const Container = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  marginTop: 80,
  paddingTop: 32,
  borderTop: '1px solid $gray200',
})

const Profile = styled('img', {
  width: 56,
  height: 56,
  borderRadius: '50%',
  flexShrink: 0,
})

const Body = styled('div', {
  flex: 1,
  minWidth: 0,
})

const Name = styled('p', {
  margin: 0,
  fontFamily: '$serif',
  fontSize: '1.05rem',
  color: '$gray800',
  fontWeight: 600,
})

const Paragraph = styled('p', {
  margin: '2px 0 6px',
  fontSize: '0.9rem',
  color: '$gray600',
})

const Links = styled('nav', {
  display: 'flex',
  gap: 14,
})

const Link = styled('a', {
  fontSize: '0.85rem',
  color: '$gray600',
  textDecoration: 'none',
  borderBottom: '1px solid $gray300',
  '&:hover': {
    color: '$gray800',
    borderColor: '$gray600',
  },
})
