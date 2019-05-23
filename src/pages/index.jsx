import React from 'react'
import { graphql } from 'gatsby'

import { ArticleCard, Page } from '../components'

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

function IndexPage({ data: { allMarkdownRemark: { edges } } }) {
  return (
    <Page
      title="Han Lee"
      ogTitle="Han Lee"
      ogDescription="이한의 개발 블로그"
    >
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
}

export default IndexPage
