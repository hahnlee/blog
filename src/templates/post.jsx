import React, { useRef, useEffect } from 'react'
import { graphql } from 'gatsby'

import 'prismjs/themes/prism-okaidia.css'

import { Page } from '../components'
import styles from './post.module.scss'

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`

function Post({ data: { markdownRemark } }) {
  const commentRef = useRef()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'hahnlee/blog')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('issue-term', 'pathname')
    commentRef.current.appendChild(script)
  }, [])

  const title = markdownRemark.frontmatter.title

  return (
    <Page
      title={title}
      ogTitle={title}
      ogDescription={markdownRemark.excerpt}
    >
      <h1 className={styles.title}>{title}</h1>
      <p>{markdownRemark.frontmatter.date}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
      <div ref={commentRef} />
    </Page>
  )
}

export default Post
