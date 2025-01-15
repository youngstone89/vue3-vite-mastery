import { Article } from '@/fsd/entities/Article/model/article'

export async function fetchArticles(): Promise<Article[]> {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Article(1, 'First Article', 'This is the first article'),
        new Article(2, 'Second Article', 'This is the second article'),
        new Article(3, 'Third Article', 'This is the third article')
      ])
    }, 1000)
  })
}
