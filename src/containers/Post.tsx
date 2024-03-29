import App from '@components/App'
import Article from '@components/Article'
import Author from '@components/Author'
import NavBar from '@components/NavBar'
import SEO from '@components/SEO'
import { styled } from '@styles/stitches'
import { graphql, HeadProps, PageProps } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        summary
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

interface Post {
  body: string
  timeToRead: number
  frontmatter: {
    title: string
    date: string
    summary: string
    thumbnail: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

interface Response {
  mdx: Post
}

export default function Post({ data }: PageProps<Response>) {
  return (
    <App>
      <Main>
        <NavBar />
        <Article
          title={data.mdx.frontmatter.title}
          date={data.mdx.frontmatter.date}
        >
          {data.mdx.body}
        </Article>
        <Author />
      </Main>
    </App>
  )
}

const Main = styled('main', {
  maxWidth: 1000,
  padding: 24,
  margin: '0 auto',
})

export function Head({ data }: HeadProps<Response>) {
  const imageUrl =
    data.mdx.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images
      .fallback?.src

  return (
    <SEO
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.summary}
      type="article"
      image={imageUrl}
    >
      <meta property="article:author" content="이한" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@hanleedev" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:label1" content="읽는 시간" />
      <meta name="twitter:data1" content={`${data.mdx.timeToRead}분`} />
    </SEO>
  )
}
