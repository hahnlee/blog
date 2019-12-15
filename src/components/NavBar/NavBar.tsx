import React from 'react'
import { Link } from 'gatsby'

import * as Styled from './NavBar.styled'

const LINKS = [
  { title: 'About', url: 'https://hanlee.io' },
  { title: 'GitHub', url: 'https://github.com/hahnlee' },
  { title: 'RSS', url: 'https://blog.hanlee.io/rss.xml' },
]

function NavBar() {
  return (
    <Styled.NavBar>
      <Styled.Title>
        Han Lee
      </Styled.Title>
    </Styled.NavBar>
  )
}

export default NavBar
