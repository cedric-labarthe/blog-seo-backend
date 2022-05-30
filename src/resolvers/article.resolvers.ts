import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Article, ArticleInput } from '../entities'

@Resolver(() => Article)
export class ArticleResolvers {
  @Query(() => Article)
  async getArticle(@Arg('id') id: number): Promise<Article | undefined> {
    const article = await Article.findOneByOrFail({ id })
    return article
  }

  @Query(() => [Article])
  async getArticles(): Promise<[Article[], number]> {
    const [articles, articlesCount] = await Article.findAndCount()
    return [articles, articlesCount]
  }

  @Mutation()
  async createArticle(@Arg('input') input: ArticleInput) {
    try {
      // TODO add validation
      const newArticle = Article.create({ ...input })
      await newArticle.save()
      return newArticle
    } catch (error) {
      console.error(error)
    }
  }
}
