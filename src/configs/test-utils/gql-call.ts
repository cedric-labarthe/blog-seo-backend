// https://github.com/benawad/type-graphql-series/blob/9_tests/src/test-utils/gCall.ts

import { graphql, GraphQLSchema } from 'graphql'
import { buildSchema, Maybe } from 'type-graphql'

import resolvers from '../../resolvers'

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any // eslint-disable-line
  }>
  userId?: number
}

let schema: GraphQLSchema

export const gqlCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: resolvers,
      emitSchemaFile: true,
    })
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  })
}
