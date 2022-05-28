import 'reflect-metadata'

import express from 'express'
import './configs/env'

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'

import resolvers from './resolvers'
import { AppDataSource } from './configs/data-source'

const init = async () => {
  const app = express()

  const PORT = Number(process.env.APP_PORT) || 8000

  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: true,
  })

  try {
    await AppDataSource.initialize()
    console.info('Data Source has been initialized! 🙌')
  } catch (error) {
    console.error('Error during Data Source initialization 💩', error)
  }

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  )

  app.listen(PORT)

  console.log(`Server listening on http://localhost:${PORT}/graphql 👈 🔥🔥🔥`)
}

init()
