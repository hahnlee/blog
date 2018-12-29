import React from 'react'
import { graphql } from 'gatsby'

import 'prismjs/themes/prism-okaidia.css'

import { Page } from '../components'


export default ({ data: { markdownRemark }}) => (
  <Page title={markdownRemark.frontmatter.title}>
    <h1>{markdownRemark.frontmatter.title}</h1>
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
