import { Link } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'
import { colors } from '../styles/colors'
import { styled, css } from '../styles/stitches'

interface Props {
  title: string
  description: string
  href: string
}

export default function PostItem({
  title,
  description,
  href,
}: Props) {
  return (
    <Container to={href}>
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
  lineHeight: '36px',
  wordBreak: 'keep-all',
})

const Description = styled('p', {
  margin: 0,
  fontSize: 16,
  color: colors.grey6,
  wordBreak: 'keep-all',
})

const Item = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})
