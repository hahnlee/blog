import { styled } from '@stitches/react'
import React from 'react'
import Header from './Header'
import SideBar from './SideBar'

export default function NavBar() {
  return (
    <Container>
      <Header />
      <SideBar />
    </Container>
  )
}

const Container = styled('nav', {
  position: 'fixed',
  '@media(max-width: 600px)': {
    position: 'static',
  },
})
