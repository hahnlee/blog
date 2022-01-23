import { graphql, Link } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Page from './Page'
import { colors } from '../styles/colors'
import { globalReset } from '../styles/global'
import { global, styled } from '../styles/stitches'
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
  globalReset()
  postReset()

  return (
    <Page
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.summary}
      image={data.mdx.frontmatter.thumbnail.childImageSharp.fluid.src}
      publishedTime={data.mdx.frontmatter.date}
    >
      <Main>
        <Container>
          <Article>
            <header>
              <Title>{data.mdx.frontmatter.title}</Title>
              <p>{data.mdx.frontmatter.date}</p>
            </header>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Article>
          <Back to="/">← 글 목록</Back>
        </Container>
      </Main>
    </Page>
  )
}

const postReset = global({
  ':not(pre) > code[class*="language-"]': {
    backgroundColor: colors.grey0,
  },
  'pre[class*="language-"]': {
    backgroundColor: colors.grey0,
    borderRadius: 16,
  },
})

const Main = styled('main', {
  paddingBottom: 'env(safe-area-inset-bottom, 0)',
})

const Container = styled('div', {
  maxWidth: 1000,
  margin: '0 auto',
  padding: 30,
  '@media(max-width: 600px)': {
    padding: '24px 16px',
  },
})

const Article = styled('article', {
  wordBreak: 'keep-all',
  a: {
    color: colors.blue7,
    textDecoration: 'none',
  },
  blockquote: {
    margin: 0,
    padding: '1px 16px',
    color: colors.grey6,
    borderLeft: `5px solid ${colors.grey2}`,
    p: {
      margin: '10px 0',
    }
  },
})

const Title = styled('h1', {
  fontSize: 36,
  margin: 0,
})

const Back = styled(Link, {
  color: colors.grey6,
  textDecoration: 'none',
  margin: '15px 0',
  display: 'inline-block',
})
