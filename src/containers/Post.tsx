import { graphql, Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useState } from 'react'
import Page from './Page'
import { colors } from '../styles/colors'
import { globalReset } from '../styles/global'
import { global, styled } from '../styles/stitches'
import 'prismjs/themes/prism.css'

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        summary
        thumbnail {
          childImageSharp {
            fluid(maxHeight: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

interface Props {
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
        summary: string
        date: string
        thumbnail: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }
}

export default function Post({ data }: Props) {
  globalReset()
  postReset()

  const [commentRef, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (commentRef == null) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'hahnlee/blog')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('issue-term', 'pathname')
    commentRef.appendChild(script)
  }, [commentRef])

  return (
    <Page
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.summary}
      image={data.mdx.frontmatter.thumbnail.childImageSharp.fluid.src}
      publishedTime={data.mdx.frontmatter.date}
    >
      <Main>
        <Article>
          <Back to="/">← 글 목록</Back>
          <header>
            <Title>{data.mdx.frontmatter.title}</Title>
            <p>{data.mdx.frontmatter.date}</p>
          </header>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
          <Back to="/">← 글 목록</Back>
        </Article>
        <section ref={setRef} />
      </Main>
    </Page>
  )
}

const postReset = global({
  body: {
    fontFamily: 'sans-serif',
  },
  ':not(pre) > code[class*="language-"]': {
    backgroundColor: colors.grey0,
  },
  'pre[class*="language-"]': {
    backgroundColor: colors.grey0,
    borderRadius: 16,
  },
})

const Main = styled('main', {
  paddingBottom: 'env(safe-area-inset-bottom, 0)',
})

const Article = styled('article', {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '30px',
  wordBreak: 'keep-all',
  a: {
    color: colors.blue7,
  },
  blockquote: {
    margin: 0,
    padding: '1px 16px',
    borderLeft: `5px solid ${colors.grey2}`,
  },
  '@media(max-width: 600px)': {
    padding: '15px',
  },
})

const Title = styled('h1', {
  fontSize: 36,
  margin: 0,
})

const Back = styled(Link, {
  color: colors.grey6,
  textDecoration: 'none',
  margin: '15px 0',
  display: 'inline-block',
})
