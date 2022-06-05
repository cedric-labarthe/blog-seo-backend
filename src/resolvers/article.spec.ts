import { DataSource } from 'typeorm'
import { gqlCall } from '../configs/test-utils/gql-call'
import { createTestConnection } from '../configs/test-utils/test-connection'

let connection: DataSource
beforeAll(async () => {
  connection = await createTestConnection()!.initialize()
})
afterAll(async () => {
  await connection.destroy()
})

describe('Article resolvers', () => {
  let createdId: string

  it('should create and return article', async () => {
    const createArticle = `
    mutation Mutation($input: ArticleInput!) {
      createArticle(input: $input) {
        id
        short_description
        title
        text
        createdAt
        updatedAt
        deletedAt
  }
}`

    const response = await gqlCall({
      source: createArticle,
      variableValues: {
        input: {
          title: 'test title',
          short_description: 'bla bla bla',
          text: 'Un grand bla bla bla',
        },
      },
    })

    const data = response?.data?.createArticle

    expect(data).toHaveProperty('title', 'test title')
    expect(data).toHaveProperty('short_description', 'bla bla bla')
    expect(data).toHaveProperty('text', 'Un grand bla bla bla')
    expect(data).toHaveProperty('createdAt')
    createdId = data.id
    expect(data).toHaveProperty('updatedAt')
    expect(data).toHaveProperty('id', createdId)
  }),
    it('should return full list (no pagination yet)', async () => {
      const getArticles = `
      query Articles {
        getArticles {
          title
          text
          short_description
          createdAt
          updatedAt
          id
        }
      }
    `

      const response = await gqlCall({ source: getArticles })

      const data = response?.data?.getArticles[0]

      expect(data).toHaveProperty('title', 'test title')
      expect(data).toHaveProperty('short_description', 'bla bla bla')
      expect(data).toHaveProperty('text', 'Un grand bla bla bla')
      expect(data).toHaveProperty('createdAt')
      expect(data).toHaveProperty('updatedAt')
      expect(data).toHaveProperty('id', createdId)
    }),
    it('should return an article by id', async () => {
      const getArticle = `
    query Query($getArticleId: Float!) {
      getArticle(id: $getArticleId) {
        id
        short_description
        title
        text
        createdAt
        updatedAt
        deletedAt
  }
}`

      const response = await gqlCall({
        source: getArticle,
        variableValues: {
          getArticleId: Number(createdId),
        },
      })

      const data = response?.data?.getArticle

      expect(data).toHaveProperty('title', 'test title')
      expect(data).toHaveProperty('short_description', 'bla bla bla')
      expect(data).toHaveProperty('text', 'Un grand bla bla bla')
      expect(data).toHaveProperty('createdAt')
      expect(data).toHaveProperty('updatedAt')
      expect(data).toHaveProperty('id', createdId)
    })
})
