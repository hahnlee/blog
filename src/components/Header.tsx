import React from 'react'
import { styled } from '../styles/stitches'

export default function Header() {
  return (
    <div>
      <Title>
        形式知
      </Title>
    </div>
  )
}

const Title = styled('h1', {
  margin: '0 auto',
  whiteSpace: 'pre',
  fontSize: 36,
  marginBottom: 16,
})
