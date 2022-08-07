export interface Post {
  id: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    summary: string
  }
}
