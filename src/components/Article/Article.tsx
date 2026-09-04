import React, { ReactNode } from 'react'
import { Container } from './Article.styled'
import 'prismjs/themes/prism.css'
import { styled } from '@styles/stitches'

interface Props {
  title: string
  date: string
  dateText: string
  timeToRead: number
  children: ReactNode
}

export default function Article({
  title,
  date,
  dateText,
  timeToRead,
  children,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Meta>
          <time dateTime={date}>{dateText}</time>
          <Separator aria-hidden="true">·</Separator>
          <span>{timeToRead}분 읽기</span>
        </Meta>
      </Header>
      {children}
    </Container>
  )
}

const Header = styled('header', {
  marginBottom: 48,
  paddingBottom: 24,
  borderBottom: '1px solid $gray800',
})

const Title = styled('h1', {
  fontFamily: '$serif',
  fontSize: '2.1rem',
  lineHeight: 1.35,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: '$gray900',
  margin: '0 0 12px !important',
  wordBreak: 'keep-all',
  '@media screen and (max-width: 720px)': {
    fontSize: '1.75rem',
  },
})

const Meta = styled('p', {
  margin: '0 !important',
  fontSize: '0.85rem',
  color: '$gray500',
  letterSpacing: '0.02em',
  fontVariantNumeric: 'tabular-nums',
})

const Separator = styled('span', {
  margin: '0 8px',
})
