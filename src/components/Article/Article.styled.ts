import { styled } from '@styles/stitches'

export const Container = styled('article', {
  fontSize: 17,
  lineHeight: 1.85,
  color: '$gray800',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  'h1, h2, h3, h4': {
    fontFamily: '$serif',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: '$gray900',
    lineHeight: 1.4,
    marginTop: '2.4em',
    marginBottom: '0.6em',
  },
  h1: {
    fontSize: '1.5rem',
  },
  h2: {
    fontSize: '1.3rem',
  },
  h3: {
    fontSize: '1.15rem',
  },
  h4: {
    fontSize: '1rem',
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

  'pre[class*="language-"]': {
    fontSize: 15,
    lineHeight: 1.6,
    borderRadius: 8,
    border: '1px solid $gray200',
    backgroundColor: '$gray000',
    margin: '0 0 1.5em',
    '.token.operator': {
      backgroundColor: 'transparent',
    },
    '.gatsby-highlight-code-line': {
      display: 'block',
      backgroundColor: '$gray200',
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 16,
    },
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
