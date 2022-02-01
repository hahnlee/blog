import React from 'react'
import { colors } from '../styles/colors'
import { styled } from '../styles/stitches'

export default function SideBar() {
  return (
    <Container>
      <Menu role="menu">
        <MenuItem role="menuitem" href="https://hanlee.io">
          about
        </MenuItem>
        <MenuItem role="menuitem" href="https://github.com/hahnlee">
          github
        </MenuItem>
        <MenuItem role="menuitem" href="/rss.xml">
          rss
        </MenuItem>
      </Menu>
    </Container>
  )
}

const Container = styled('nav', {
  height: '100%',
})

const Menu = styled('div', {
  display: 'flex',
  width: 'min-content',
  '@media(max-width: 600px)': {
    flexDirection: 'row',
    paddingTop: 10,
    marginTop: 10,
  },
})

const MenuItem = styled('a', {
  color: colors.grey7,
  marginRight: 15,
  '&:active': {
    color: colors.grey7,
  },
  '&:visited': {
    color: colors.grey7,
  },
  '@media(max-width: 600px)': {
    fontSize: 14,
  },
})
