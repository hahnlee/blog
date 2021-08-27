import React from 'react'
import { styled } from '@stitches/react'

export default function Header() {
  return (
    <Container>
      <Title>
        形式知
        <SubTitle>명시지</SubTitle>
      </Title>
      <Description>기록할 수 있는 지식을 나눕니다</Description>
    </Container>
  )
}

const Container = styled('header', {
  position: 'fixed',
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
