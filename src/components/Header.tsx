import { styled } from '@stitches/react'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import React from 'react'

export default function Header() {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 60], [1, 0]);
  const display = useTransform(scrollY, x => x >= 60 ? 'none' : 'initial');

  return (
    <header>
      <Title>
        形式知
        <SubTitle style={{ opacity, display }}>명시지</SubTitle>
      </Title>
      <Description style={{ opacity }}>기록할 수 있는 지식을 나눕니다</Description>
    </header>
  )
}

const Title = styled('h1', {
  margin: '0 auto',
  whiteSpace: 'pre',
  fontSize: 48,
})

const SubTitle = styled(motion.span, {
  fontSize: 24,
  marginLeft: 10,
})

const Description = styled(motion.p, {
  margin: 0,
})
