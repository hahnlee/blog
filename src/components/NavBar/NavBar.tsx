import { styled } from '@styles/stitches'
import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function NavBar({ children }: Props) {
  return (
    <Header>
      <Home to="/" aria-label="홈으로">
        <Logo
          src="/images/logo.png"
          draggable={false}
          alt=""
          width={28}
          height={28}
        />
        <Name>명시지</Name>
      </Home>
      {children && <Actions>{children}</Actions>}
    </Header>
  )
}

const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 64,
  '@media screen and (max-width: 720px)': {
    marginBottom: 40,
  },
})

const Home = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
  color: '$gray700',
})

const Logo = styled('img', {
  width: 28,
  height: 28,
})

const Name = styled('span', {
  fontFamily: '$reader',
  fontSize: '1rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
})

const Actions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})
