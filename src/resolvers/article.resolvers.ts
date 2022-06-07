import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Article, ArticleInput } from '../entities'

@Resolver(() => Article)
export class ArticleResolvers {
  @Query(() => Article)
  async getArticle(@Arg('id') id: number): Promise<Article | undefined> {
    const article = await Article.findOneByOrFail({ id, deletedAt: undefined })
    return article
  }

  @Query(() => [Article])
  async getArticles(): Promise<Article[]> {
    const [articles, articlesCount] = await Article.findAndCount()
    console.info(articlesCount)
    return articles
  }

  @Mutation(() => Article)
  async createArticle(
    @Arg('input') input: ArticleInput
  ): Promise<Partial<Article> | undefined> {
    try {
      const newArticle = Article.create({ ...input })
      await newArticle.save()
      return newArticle
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  @Mutation(() => Article)
  async updateArticle(
    @Arg('input') input: ArticleInput
  ): Promise<Partial<Article> | undefined> {
    try {
      const { id } = input
      const article = await Article.findOneByOrFail({ id })
      const savedArticle = await Article.save({ ...article, ...input })
      return savedArticle
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  @Mutation(() => Article)
  async softDeleteArticle(
    @Arg('id') id: number
  ): Promise<Partial<Article> | undefined> {
    try {
      const article = await Article.findOneByOrFail({ id })
      article.deletedAt = new Date()
      Article.save(article)
      return article
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
