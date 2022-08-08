import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { Container } from './Article.styled'
import 'prismjs/themes/prism.css'
import { styled } from '@styles/stitches'

interface Props {
  title: string
  children: string
}

export default function Article({ title, children }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <MDXRenderer>{children}</MDXRenderer>
    </Container>
  )
}

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 600,
})
