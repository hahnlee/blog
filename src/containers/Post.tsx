import { global, styled } from '@stitches/react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useRef } from 'react'
import 'prismjs/themes/prism.css'

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        summary
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
    <div>
      <Article>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Article>
      <section ref={commentRef} />
    </div>
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
