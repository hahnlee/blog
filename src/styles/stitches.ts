import { createStitches } from '@stitches/react'

export const { styled, css, getCssText, globalCss, createTheme } =
  createStitches({
    theme: {
      colors: {
        bg: '#FFFFFF',
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

        codeComment: '#708090',
        codePunctuation: '#999999',
        codeProperty: '#990055',
        codeString: '#669900',
        codeOperator: '#9A6E3A',
        codeKeyword: '#0077AA',
        codeFunction: '#DD4A68',
        codeVariable: '#EE9900',
      },
      fonts: {
        sans: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        serif: '"Noto Serif KR", "Apple Myungjo", Batang, Georgia, serif',
        // 읽기 설정(src/styles/reader.ts)이 <html>에 주입하는 글꼴. 기본은 고딕.
        reader: 'var(--reader-font, var(--fonts-sans))',
      },
      sizes: {
        // 읽기 설정의 좌우 여백 값이 주입되면 그 폭을 따른다.
        measure: 'var(--reader-measure, 680px)',
      },
    },
  })

// 종이책 느낌의 세피아 톤. 명도 순서는 기본 테마와 동일하게 유지한다.
export const sepiaTheme = createTheme('theme-sepia', {
  colors: {
    bg: '#F4ECD8',
    gray000: '#EDE3CB',
    gray100: '#E7DCC1',
    gray200: '#DDD0B0',
    gray300: '#D0C19C',
    gray400: '#BBA985',
    gray500: '#97866A',
    gray600: '#7B6952',
    gray700: '#665542',
    gray800: '#574434',
    gray900: '#43321F',
    blue700: '#7A5230',

    codeComment: '#8A7A64',
    codePunctuation: '#8A7A64',
    codeProperty: '#8E3B5B',
    codeString: '#5C6F1E',
    codeOperator: '#8A5A2B',
    codeKeyword: '#2E5E7E',
    codeFunction: '#B04858',
    codeVariable: '#A86A12',
  },
})

// 어두운 테마. 회색 스케일을 뒤집어 기존 컴포넌트 코드를 수정하지 않고도 동작하게 한다.
export const darkTheme = createTheme('theme-dark', {
  colors: {
    bg: '#161616',
    gray000: '#1F1F1F',
    gray100: '#262626',
    gray200: '#303030',
    gray300: '#3A3A3A',
    gray400: '#525252',
    gray500: '#8A8A8A',
    gray600: '#A6A6A6',
    gray700: '#C4C4C4',
    gray800: '#D9D9D9',
    gray900: '#F2F2F2',
    blue700: '#7CB8F2',

    codeComment: '#8B949E',
    codePunctuation: '#A0A0A0',
    codeProperty: '#E58BB5',
    codeString: '#A5D46A',
    codeOperator: '#D2A679',
    codeKeyword: '#79C0FF',
    codeFunction: '#F08A9B',
    codeVariable: '#FFC76B',
  },
})

export const globalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    fontSize: 16,
    color: '$gray800',
    backgroundColor: '$bg',
    fontWeight: 400,
    fontFamily: '$sans',
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
  },
  '*': {
    boxSizing: 'border-box',
  },
  '::selection': {
    backgroundColor: '$gray300',
  },
  [`.${darkTheme.className}`]: {
    colorScheme: 'dark',
  },
})
