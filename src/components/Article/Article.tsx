import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { Container } from './Article.styled'
import 'prismjs/themes/prism.css'

interface Props {
  title: string
  children: string
}

export default function Article({ title, children }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
      <MDXRenderer>{children}</MDXRenderer>
    </Container>
  )
}
