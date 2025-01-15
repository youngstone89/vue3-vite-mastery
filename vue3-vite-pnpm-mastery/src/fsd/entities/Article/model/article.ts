export class Article {
  id: number
  title: string
  excerpt: string
  constructor(id: number, title: string, excerpt: string) {
    this.id = id
    this.title = title
    this.excerpt = excerpt
  }
}
