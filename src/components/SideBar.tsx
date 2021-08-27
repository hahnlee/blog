import React from 'react'
import { styled } from '@stitches/react'

export default function SideBar() {
  return (
    <Container>
      <Menu role="menu">
        <MenuItem role="menuitem" href="https://hanlee.io">
          about
        </MenuItem>
        <MenuItem role="menuitem" href="/tags/tech">
          tech
        </MenuItem>
        <MenuItem role="menuitem" href="/tags/inspiration">
          inspiration
        </MenuItem>
      </Menu>
    </Container>
  )
}

const Container = styled('aside', {
  position: 'fixed',
  height: '100%',
})

const Menu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: 'min-content',
  paddingTop: 30,
  marginTop: 130,
  borderTop: '1px solid #e9ecef',
})

const MenuItem = styled('a', {
  color: 'black',
  marginBottom: 10,
  '&:active': {
    color: 'black',
  },
  '&:visited': {
    color: 'black',
  },
})
