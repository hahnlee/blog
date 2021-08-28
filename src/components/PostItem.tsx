import { styled, css } from '@stitches/react'
import { Link } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'
import { colors } from '../styles/colors'

interface Props {
  title: string
  description: string
  href: string
  thumbnail: FixedObject
}

export default function PostItem({
  title,
  description,
  href,
  thumbnail,
}: Props) {
  return (
    <Container to={href}>
      <Image className={thumbnailImage} fixed={thumbnail} alt="" />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  )
}

const Container = styled(Link, {
  color: colors.grey7,
  textDecoration: 'none',
})

const Title = styled('h1', {
  margin: 0,
  fontSize: 24,
  wordBreak: 'keep-all',
})

const Description = styled('p', {
  margin: 0,
  fontSize: 14,
  wordBreak: 'keep-all',
})

const { className: thumbnailImage } = css({
  marginBottom: 10,
})
