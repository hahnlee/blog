import { styled, global } from '@stitches/react'
import React from 'react'
import SideBar from '../components/SideBar'

export default function Home() {
  globalStyle()

  return (
    <Main>
      <SideBar />
      <div />
    </Main>
  )
}

const globalStyle = global({
  html: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  body: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  ___gatsby: {
    width: '100%',
    height: '100%',
  },
})

const Main = styled('main', {
  padding: '60px',
  height: '100%',
})
