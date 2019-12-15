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
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        summary
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

  const {
    frontmatter: { title, summary, date },
    timeToRead,
    html,
  } = markdownRemark

  return (
    <Page
      title={title}
      ogTitle={title}
      ogDescription={summary}
    >
      <h1 className={styles.title}>{title}</h1>
      <p>{date} • {timeToRead}분</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div ref={commentRef} />
    </Page>
  )
}

export default Post
