import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Media, MediaInput, MediaType } from '../entities'

@Resolver()
export class MediaResolvers {
  @Query(() => [Media])
  async getMedias(): Promise<Array<Media>> {
    const medias = await Media.find()
    return medias
  }

  @Query(() => Media)
  async getMedia(@Arg('id') id: number): Promise<Media | undefined> {
    const media = await Media.findOneByOrFail({ id })
    return media
  }

  @Query(() => [Media])
  async getMediasByType(
    @Arg('type', () => MediaType) type: MediaType
  ): Promise<Array<Media>> {
    const medias = await Media.findBy({ type })
    return medias
  }

  @Mutation(() => Media)
  async createMedia(@Arg('input') input: MediaInput): Promise<Media> {
    const newMedia = Media.create({ ...input })
    await newMedia.save()
    return newMedia
  }

  @Mutation(() => Media)
  async softDeleteMedia(@Arg('id') id: number): Promise<Media> {
    const deletedMedia = await Media.findOneByOrFail({ id })
    deletedMedia.deletedAt = new Date()
    await Media.save(deletedMedia)
    return deletedMedia
  }
}
