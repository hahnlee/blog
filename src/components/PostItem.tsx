import { styled } from '@stitches/react'
import { Link } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'

interface Props {
  title: string
  description: string
  href: string
  thumbnail: FixedObject
}

export default function PostItem({ title, description, href, thumbnail }: Props) {
  return (
    <Container to={href}>
      <Image fixed={thumbnail} alt="" />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  )
}

const Container = styled(Link, {
  color: 'black',
  textDecoration: 'none',
})

const Title = styled('h1', {
  margin: 0,
  fontSize: 24,
})

const Description = styled('p', {
  margin: 0,
  fontSize: 14,
})