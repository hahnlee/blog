import React from 'react'
import { styled } from '@stitches/react'

export default function SideBar() {
  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <header>
        <Title>
          形式知
          <SubTitle>명시지</SubTitle>
        </Title>
        <Description>기록할 수 있는 지식을 나눕니다</Description>
      </header>
      <Menu role="menu">
        <MenuItem role="menuitem">about</MenuItem>
        <MenuItem role="menuitem">tech</MenuItem>
        <MenuItem role="menuitem">inspiration</MenuItem>
      </Menu>
    </Container>
  )
}

const Container = styled('aside', {
  position: 'fixed',
  paddingRight: '60px',
  height: '100%',
  fontFamily: "'Noto Serif KR', serf",
})

const Title = styled('h1', {
  margin: '0 auto',
  whiteSpace: 'pre',
  fontSize: 48,
})

const SubTitle = styled('span', {
  fontSize: 24,
  marginLeft: 10,
})

const Description = styled('p', {
  margin: 0,
})

const Menu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  paddingTop: 30,
  marginTop: 40,
  borderTop: '1px solid #e9ecef',
})

const MenuItem = styled('a', {
  marginBottom: 10,
})
