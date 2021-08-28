import React from 'react'
import { styled } from '@stitches/react'
import { colors } from '../styles/colors'

export default function SideBar() {
  return (
    <Container>
      <Menu role="menu">
        <MenuItem role="menuitem" href="https://hanlee.io">
          about
        </MenuItem>
        <MenuItem role="menuitem" href="/categories/tech">
          tech
        </MenuItem>
        <MenuItem role="menuitem" href="/categories/inspiration">
          inspiration
        </MenuItem>
        <MenuItem role="menuitem" href="/rss.xml">
          rss
        </MenuItem>
      </Menu>
    </Container>
  )
}

const Container = styled('aside', {
  height: '100%',
})

const Menu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  paddingTop: 30,
  marginTop: 30,
  marginBottom: 15,
  borderTop: `1px solid ${colors.grey2}`,
  '@media(max-width: 600px)': {
    flexDirection: 'row',
    paddingTop: 10,
    marginTop: 10,
  },
})

const MenuItem = styled('a', {
  color: colors.grey7,
  marginRight: 15,
  marginBottom: 10,
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
