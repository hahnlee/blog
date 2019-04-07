import React from 'react'
import { graphql } from 'gatsby'

import { ArticleCard, Page } from '../components'


export default ({ data: { allMarkdownRemark: { edges } } }) => (
  <Page title="Han Lee's Dev Blog">
    {edges.map(({ node }, index) => (
      <ArticleCard
        key={index}
        to={node.fields.slug}
        date={node.frontmatter.date}
        title={node.frontmatter.title}
        timeToRead={node.timeToRead}
      />
    ))}
  </Page>
)

export const query = graphql`
{
  allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
    edges {
      node {
        timeToRead
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
        }
      }
    }
  }
}
`
