export interface Post {
  id: string
  fields: {
    slug: string
    dateText: string
  }
  frontmatter: {
    title: string
    summary: string
    date: string
  }
}
