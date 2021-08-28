import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { styled } from '../styles/stitches'

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
