import { global, styled } from '@stitches/react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useRef } from 'react'
import Page from './Page'
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
  resetPrism()

  const commentRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'hahnlee/blog')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('issue-term', 'pathname')
    commentRef.current?.appendChild(script)
  }, [])

  return (
    <Page
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.summary}
      image={data.mdx.frontmatter.thumbnail.childImageSharp.fluid.src}
      publishedTime={data.mdx.frontmatter.date}
    >
      <main>
        <Article>
          <header>
            <h1>{data.mdx.frontmatter.title}</h1>
            <p>{data.mdx.frontmatter.date}</p>
          </header>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Article>
        <section ref={commentRef} />
      </main>
    </Page>
  )
}

const resetPrism = global({
  ':not(pre) > code[class*="language-"]': {
    backgroundColor: 'white',
  },
  'pre[class*="language-"]': {
    backgroundColor: 'white',
  },
})

const Article = styled('article', {
  maxWidth: '800px',
  margin: '0 auto',
})
