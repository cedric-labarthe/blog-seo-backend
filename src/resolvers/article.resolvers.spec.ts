import { GraphQLError } from 'graphql/error/GraphQLError'
import { DataSource } from 'typeorm'
import { gqlCall } from '../configs/test-utils/gql-call'
import { createTestConnection } from '../configs/test-utils/test-connection'

let connection: DataSource
beforeAll(async () => {
  connection = await createTestConnection()!.initialize()
})
afterAll(async () => {
  await connection.dropDatabase()
  await connection.destroy()
})

describe('Article resolvers', () => {
  let createdId: string

  describe('Create =>', () => {
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
      it('should fail with incorrect arguments', async () => {
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
              title: 'test',
              short_description: 'bla',
              text: 'bla',
            },
          },
        })

        const errors = response?.errors

        expect(errors?.[0]).toBeInstanceOf(GraphQLError)

        expect(response?.data).toBeNull()
      }),
      it('should fail with duplicate title', async () => {
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

        const data = response?.data
        expect(data).toBeNull()

        const error = response?.errors?.[0]
        expect(error).toBeInstanceOf(GraphQLError)
        expect(error?.message).toContain(
          'QueryFailedError: duplicate key value violates unique constraint'
        )
      })
  }),
    describe('Read =>', () => {
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
    }),
    describe('Update =>', () => {
      describe('should update an article by id', () => {
        const updateArticle = `
        mutation UpdateArticle($input: ArticleInput!) {
          updateArticle(input: $input) {
            id
            title
            short_description
            text
            createdAt
            updatedAt
          }
        }`
        it('could update only one field', async () => {
          const response = await gqlCall({
            source: updateArticle,
            variableValues: {
              input: {
                id: Number(createdId),
                title: 'test title updated',
              },
            },
          })

          const data = response?.data?.updateArticle

          expect(data).toHaveProperty('title', 'test title updated')
          expect(data).toHaveProperty('short_description', 'bla bla bla')
          expect(data).toHaveProperty('text', 'Un grand bla bla bla')
          expect(data).toHaveProperty('createdAt')
          expect(data).toHaveProperty('updatedAt')
          expect(data).toHaveProperty('id', createdId)
        }),
          it('could update all fields', async () => {
            const response = await gqlCall({
              source: updateArticle,
              variableValues: {
                input: {
                  id: Number(createdId),
                  title: 'test title full update',
                  short_description: 'test short_description full update',
                  text: 'test text full update',
                },
              },
            })

            const data = response?.data?.updateArticle

            expect(data).toHaveProperty('title', 'test title full update')
            expect(data).toHaveProperty(
              'short_description',
              'test short_description full update'
            )
            expect(data).toHaveProperty('text', 'test text full update')
            expect(data).toHaveProperty('createdAt')
            expect(data).toHaveProperty('updatedAt')
            expect(data).toHaveProperty('id', createdId)
          }),
          it('fail with incorrect id', async () => {
            const response = await gqlCall({
              source: updateArticle,
              variableValues: {
                input: {
                  id: Number(createdId + 5),
                  title: 'test title full update',
                  short_description: 'test short_description full update',
                  text: 'test text full update',
                },
              },
            })

            const data = response?.data
            expect(data).toBeNull()

            const error = response?.errors?.[0]
            expect(error).toBeInstanceOf(GraphQLError)
            expect(error?.message).toBe(
              `EntityNotFoundError: Could not find any entity of type \"Article\" matching: {
    \"id\": ${createdId + 5}
}`
            )
          })
      })
    }),
    describe('Delete =>', () => {
      const softDeleteArticle = `
        mutation Mutation($softDeleteArticleId: Float!) {
          softDeleteArticle(id: $softDeleteArticleId) {
            id
            title
            short_description
            text
            createdAt
            updatedAt
            deletedAt
          }
        }`
      it('should soft delete an article by id', async () => {
        const response = await gqlCall({
          source: softDeleteArticle,
          variableValues: {
            softDeleteArticleId: Number(createdId),
          },
        })

        const data = response?.data?.softDeleteArticle

        expect(data).toHaveProperty('title', 'test title full update')
        expect(data).toHaveProperty(
          'short_description',
          'test short_description full update'
        )
        expect(data).toHaveProperty('text', 'test text full update')
        expect(data).toHaveProperty('createdAt')
        expect(data).toHaveProperty('updatedAt')
        expect(data).toHaveProperty('id', createdId)

        expect(data).toHaveProperty('deletedAt')
        expect(data.deletedAt).not.toBeNull()
        expect(typeof data.deletedAt).toBe('string')
      }),
        it('fail with incorrect id', async () => {
          const response = await gqlCall({
            source: softDeleteArticle,
            variableValues: {
              softDeleteArticleId: Number(createdId + 5),
            },
          })

          const data = response?.data
          expect(data).toBeNull()

          const error = response?.errors?.[0]
          expect(error).toBeInstanceOf(GraphQLError)
          expect(error?.message).toBe(
            `EntityNotFoundError: Could not find any entity of type \"Article\" matching: {
    \"id\": ${createdId + 5}
}`
          )
        })
    })
})
