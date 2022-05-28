import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { User, UserInput } from '../entities/user.entity'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async getUser(@Arg('id') id: number): Promise<User | undefined> {
    const user = await User.findOneByOrFail({ id })
    return user
  }

  @Mutation(() => User)
  async createUser(@Arg('input', { validate: true }) userInput: UserInput) {
    const user = User.create({ ...userInput })
    await user.save()
    return user
  }
}
