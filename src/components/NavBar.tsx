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

const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 800,
  margin: '0 auto',
  backgroundColor: 'white',
  zIndex: 1,
  padding: '0 16px',
})
