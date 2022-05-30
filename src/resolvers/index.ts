import { UserResolver } from './user.resolvers'
import { ArticleResolvers } from './article.resolvers'

export default [UserResolver, ArticleResolvers] as const
