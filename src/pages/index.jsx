import React from 'react'
import { graphql } from 'gatsby'

import { ArticleCard, ArticleGroup, Page } from '../components'


export default ({ data: { allMarkdownRemark: { edges } } }) => (
  <Page title="Han Lee's Dev Blog">
    <ArticleGroup>
      {edges.map(({ node }, index) => (
        <ArticleCard
          key={index}
          to={node.fields.slug}
          date={node.frontmatter.date}
          title={node.frontmatter.title}
          backgroundColor={node.frontmatter.backgroundColor}
          color={node.frontmatter.color}
          timeToRead={node.timeToRead}
        />
      ))}
    </ArticleGroup>
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
          color
          backgroundColor
        }
      }
    }
  }
}
`
