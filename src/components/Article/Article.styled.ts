import { styled } from '@styles/stitches'

// --reader-* 변수는 읽기 설정(src/styles/reader.ts)에서 <html>에 주입한다.
export const Container = styled('article', {
  fontFamily: '$reader',
  fontSize: 'var(--reader-font-size, 17px)',
  lineHeight: 'var(--reader-line-height, 1.85)',
  color: '$gray800',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  'h1, h2, h3, h4': {
    fontFamily: '$reader',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: '$gray900',
    lineHeight: 1.4,
    marginTop: '2.4em',
    marginBottom: '0.6em',
  },
  h1: {
    fontSize: '1.4em',
  },
  h2: {
    fontSize: '1.22em',
  },
  h3: {
    fontSize: '1.08em',
  },
  h4: {
    fontSize: '0.95em',
  },

  p: {
    marginTop: 0,
    marginBottom: '1.25em',
  },
  'ul, ol': {
    paddingLeft: '1.4em',
    marginTop: 0,
    marginBottom: '1.25em',
  },
  li: {
    marginBottom: '0.3em',
  },

  a: {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: '$gray400',
    textUnderlineOffset: '0.2em',
    textDecorationThickness: '1px',
    transition: 'text-decoration-color 0.15s ease',
    '&:hover': {
      textDecorationColor: '$gray800',
    },
  },

  strong: {
    fontWeight: 600,
    color: '$gray900',
  },

  'p code, li code': {
    fontSize: '0.9em',
    padding: '1px 5px',
    borderRadius: 4,
    backgroundColor: '$gray000',
    border: '1px solid $gray200',
  },

  blockquote: {
    margin: '1.5em 0',
    padding: '0 0 0 20px',
    color: '$gray600',
    borderLeft: '2px solid $gray300',
    p: {
      marginBottom: '0.5em',
    },
    'p:last-child': {
      marginBottom: 0,
    },
  },

  hr: {
    border: 'none',
    height: 1,
    backgroundColor: '$gray200',
    margin: '3em 0',
  },

  img: {
    maxWidth: '100%',
    height: 'auto',
  },
  '.gatsby-resp-image-wrapper': {
    marginTop: '1.5em',
    marginBottom: '1.5em',
  },

  iframe: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto 1.5em',
  },

  'pre[class*="language-"], code[class*="language-"]': {
    color: '$gray800',
    textShadow: 'none',
  },
  'pre[class*="language-"]': {
    fontSize: '0.88em',
    lineHeight: 1.6,
    borderRadius: 8,
    border: '1px solid $gray200',
    backgroundColor: '$gray000',
    margin: '0 0 1.5em',
    '.gatsby-highlight-code-line': {
      display: 'block',
      backgroundColor: '$gray200',
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 16,
    },
  },

  // prism.css의 라이트 전용 색을 테마 토큰으로 대체한다.
  '.token.comment, .token.prolog, .token.doctype, .token.cdata': {
    color: '$codeComment',
  },
  '.token.punctuation': {
    color: '$codePunctuation',
  },
  '.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted':
    {
      color: '$codeProperty',
    },
  '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted':
    {
      color: '$codeString',
    },
  '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string':
    {
      color: '$codeOperator',
      background: 'transparent',
    },
  '.token.atrule, .token.attr-value, .token.keyword': {
    color: '$codeKeyword',
  },
  '.token.function, .token.class-name': {
    color: '$codeFunction',
  },
  '.token.regex, .token.important, .token.variable': {
    color: '$codeVariable',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95em',
    marginBottom: '1.5em',
    'th, td': {
      padding: '8px 12px',
      borderBottom: '1px solid $gray200',
      textAlign: 'left',
    },
    th: {
      fontWeight: 600,
      borderBottomColor: '$gray400',
    },
  },

  'sup a[data-footnote-ref]': {
    textDecoration: 'none',
    fontFeatureSettings: '"tnum"',
    padding: '0 2px',
    '&::before': { content: '[' },
    '&::after': { content: ']' },
  },

  '.footnotes': {
    marginTop: '4em',
    paddingTop: '1.5em',
    borderTop: '1px solid $gray200',
    fontSize: '0.9em',
    lineHeight: 1.7,
    color: '$gray600',
    '.sr-only': {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    },
    ol: {
      margin: 0,
      paddingLeft: '1.4em',
    },
    li: {
      marginBottom: '0.4em',
    },
    p: {
      margin: 0,
    },
    'a[data-footnote-backref]': {
      textDecoration: 'none',
      marginLeft: 4,
    },
  },
})
