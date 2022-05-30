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
      // TODO add validation
      const newArticle = Article.create({ ...input })
      await newArticle.save()
      return newArticle
    } catch (error) {
      console.error(error)
    }
  }
}
