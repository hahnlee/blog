import { global } from '@stitches/react'
import { colors } from './colors'

export const globalReset = global({
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
    color: colors.grey7,
  },
  '#___gatsby': {
    width: '100%',
    height: '100%',
  },
  '#gatsby-focus-wrapper': {
    width: '100%',
    height: '100%',
  },
})
