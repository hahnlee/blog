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
  '.image-figure': {
    margin: '1.5em 0',
    textAlign: 'center',
    img: {
      display: 'block',
      width: '100%',
      margin: '0 auto',
      cursor: 'zoom-in',
      transition: 'transform 0.2s ease, filter 0.2s ease',
      '&:hover': {
        filter: 'brightness(0.96)',
      },
      '&:focus-visible': {
        outline: '2px solid $gray600',
        outlineOffset: 4,
      },
    },
    figcaption: {
      marginTop: '0.45em',
      color: '$gray600',
      fontSize: '0.82em',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  '.image-row--three': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
    width: 'calc(100% + 240px)',
    marginLeft: -120,
    marginTop: '2em',
    marginBottom: '2em',
    '.image-figure': {
      minWidth: 0,
      margin: 0,
    },
    '@media screen and (max-width: 960px)': {
      width: 'calc(100% + 80px)',
      marginLeft: -40,
    },
    '@media screen and (max-width: 720px)': {
      width: '100%',
      marginLeft: 0,
      gap: 8,
    },
  },
  '.gatsby-resp-image-wrapper': {
    marginTop: '1.5em',
    marginBottom: '1.5em',
  },

  '.image-lightbox': {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'rgba(20, 20, 20, 0.88)',
    animation: 'imageLightboxFadeIn 0.2s ease both',
    '@media screen and (max-width: 720px)': {
      padding: 16,
    },
  },
  '.image-lightbox__content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 'min(92vw, 1400px)',
    maxHeight: '92vh',
    animation: 'imageLightboxZoomIn 0.24s ease both',
    img: {
      display: 'block',
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '82vh',
      objectFit: 'contain',
      borderRadius: 4,
      boxShadow: '0 18px 60px rgba(0, 0, 0, 0.32)',
    },
  },
  '.image-lightbox__caption': {
    margin: '12px 0 0 !important',
    color: '$gray000',
    fontSize: '0.88rem',
    lineHeight: 1.5,
    textAlign: 'center',
  },
  '.image-lightbox__close': {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    padding: 0,
    border: 0,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '$gray000',
    fontSize: 30,
    fontWeight: 300,
    lineHeight: 1,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    '&:hover, &:focus-visible': {
      backgroundColor: 'rgba(255, 255, 255, 0.24)',
    },
  },
  '@keyframes imageLightboxFadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes imageLightboxZoomIn': {
    from: { opacity: 0, transform: 'scale(0.97)' },
    to: { opacity: 1, transform: 'scale(1)' },
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
    position: 'relative',
    textDecoration: 'none',
    fontFeatureSettings: '"tnum"',
    padding: '0 2px',
    cursor: 'help',
    '&::before': { content: '[' },
    '&::after': { content: ']' },
    '.footnote-tooltip': {
      display: 'none',
      position: 'absolute',
      zIndex: 2,
      left: '50%',
      bottom: 'calc(100% + 8px)',
      transform: 'translateX(-50%)',
      width: 280,
      padding: '8px 10px',
      borderRadius: 6,
      backgroundColor: '$gray900',
      color: '$gray000',
      fontSize: '0.8rem',
      fontWeight: 400,
      lineHeight: 1.5,
      whiteSpace: 'normal',
      textAlign: 'left',
      pointerEvents: 'none',
    },
    '&:hover .footnote-tooltip, &:focus-visible .footnote-tooltip': {
      display: 'block',
    },
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
