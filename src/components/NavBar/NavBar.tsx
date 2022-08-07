import { styled } from '@styles/stitches'
import { Link } from 'gatsby'
import React from 'react'

export default function NavBar() {
  return (
    <header>
      <Link to="/">
        <Logo
          src="/favicon/android-chrome-192x192.png"
          draggable={false}
          alt="블로그 로고"
        />
      </Link>
    </header>
  )
}

const Logo = styled('img', {
  width: 50,
  height: 50,
})
