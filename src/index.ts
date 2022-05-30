import 'reflect-metadata'

import express from 'express'
import './configs/env'

import { ApolloServer } from 'apollo-server-express'

import { buildSchema } from 'type-graphql'

import resolvers from './resolvers'
import { AppDataSource } from './configs/data-source'

const init = async () => {
  const app = express()

  const PORT = Number(process.env.APP_PORT) || 8000

  try {
    await AppDataSource.initialize()
    console.info('Data Source has been initialized! 🙌')
  } catch (error) {
    console.error('Error during Data Source initialization 💩', error)
  }

  try {
    const schema = await buildSchema({
      resolvers: resolvers,
      emitSchemaFile: true,
    })

    const apolloServer = new ApolloServer({ schema })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    app.listen(PORT)

    console.info(
      `Server listening on http://localhost:${PORT}/graphql 👈 🔥🔥🔥`
    )
  } catch (error) {
    console.warn(error)
  }
}

init()
