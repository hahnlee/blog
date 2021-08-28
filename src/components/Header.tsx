import { motion, useViewportScroll, useTransform } from 'framer-motion'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { styled } from '../styles/stitches'

export default function Header() {
  const isMobile = useMediaQuery({
    maxDeviceWidth: 600,
  })

  const { scrollY } = useViewportScroll()
  const opacity = useTransform(scrollY, [0, 60], [1, 0])
  const display = useTransform(scrollY, (x) => (x >= 60 ? 'none' : 'initial'))

  return (
    <header>
      <Title>
        形式知
        <SubTitle animate={!isMobile} style={{ opacity, display }}>
          명시지
        </SubTitle>
      </Title>
      <Description animate={!isMobile} style={{ opacity }}>
        기록할 수 있는 지식을 나눕니다
      </Description>
    </header>
  )
}

const Title = styled('h1', {
  margin: '0 auto',
  whiteSpace: 'pre',
  fontSize: 48,
  '@media(max-width: 600px)': {
    fontSize: 36,
  },
})

const SubTitle = styled(motion.span, {
  fontSize: 24,
  marginLeft: 10,
  '@media(max-width: 600px)': {
    fontSize: 18,
  },
})

const Description = styled(motion.p, {
  margin: 0,
})
