import { createStitches } from '@stitches/react'

export const { styled, css, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      gray000: '#F8F9FA',
      gray100: '#F1F3F5',
      gray200: '#E9ECEF',
      gray300: '#DEE2E6',
      gray400: '#CED4DA',
      gray500: '#ADB5BD',
      gray600: '#868E96',
      gray700: '#495057',
      gray800: '#343A40',
      gray900: '#212529',
      blue700: '#1C7ED6',
    },
  },
})

export const globalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    fontSize: 16,
    color: '$gray900',
    fontWeight: 400,
    fontFamily: ['Pretendard', 'sans-serif'].join(','),
  },
  '*': {
    boxSizing: 'border-box',
  },
})
