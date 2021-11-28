import { Link } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'
import { colors } from '../styles/colors'
import { styled, css } from '../styles/stitches'

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
      <Item>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Item>
    </Container>
  )
}

const Container = styled(Link, {
  color: colors.grey7,
  textDecoration: 'none',
  display: 'flex',
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

const Item = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: 24,
})

const { className: thumbnailImage } = css({
  marginBottom: 10,
})
