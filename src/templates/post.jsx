import React from 'react'
import { graphql } from 'gatsby'

import 'prismjs/themes/prism-okaidia.css'

import { Page } from '../components'
import styles from './post.module.scss'


export default ({ data: { markdownRemark }}) => (
  <Page title={markdownRemark.frontmatter.title}>
    <h1 className={styles.title}>{markdownRemark.frontmatter.title}</h1>
    <p>{markdownRemark.frontmatter.date}</p>
    <div dangerouslySetInnerHTML={{__html: markdownRemark.html}} />
  </Page>
)

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
