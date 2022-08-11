import { styled } from '@styles/stitches'

export const Container = styled('article', {
  fontSize: 18,
  lineHeight: 1.8,
  wordBreak: 'keep-all',
  'h1, h2, h3, p': {
    marginTop: 0,
    marginBottom: 12,
  },
  'h1, h2, h3': {
    fontWeight: 600,
  },
  h1: {
    fontSize: '1.5rem',
  },
  h2: {
    fontSize: '1.25rem',
  },
  h3: {
    fontSize: '1.15rem',
  },
  a: {
    color: '$blue700',
    textDecoration: 'none',
  },
  blockquote: {
    margin: '12px 0',
    padding: '1px 16px',
    color: '$gray600',
    borderLeft: '5px solid $gray200',
    p: {
      margin: '4px 0',
    },
  },
  iframe: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
    marginBottom: 18,
  },
  'pre[class*="language-"]': {
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '$gray000',
    '.token.operator': {
      backgroundColor: '$gray000',
    },
  },
  '.footnotes': {
    hr: {
      borderTop: 'none',
      borderColor: '$gray200',
    },
  },
})
