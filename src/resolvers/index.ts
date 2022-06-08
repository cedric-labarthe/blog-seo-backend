import { UserResolver } from './user.resolvers'
import { ArticleResolvers } from './article.resolvers'
import { MediaResolvers } from './media.resolvers'

export default [UserResolver, ArticleResolvers, MediaResolvers] as const
