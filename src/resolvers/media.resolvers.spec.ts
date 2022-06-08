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

describe('Media resolvers', () => {
  let createdId: string

  describe('Create', () => {
    it('should create a media', async () => {
      const createMedia = `
      mutation Mutation($input: MediaInput!) {
        createMedia(input: $input) {
          id
          type
          path
          createdAt
          updatedAt
          deletedAt
        }
      }`
      const variableValues = {
        input: { type: 'IMAGE', path: '/fake-path/image.jpg' },
      }
      const response = await gqlCall({
        source: createMedia,
        variableValues,
      })
      const data = response.data?.createMedia

      expect(data).toHaveProperty('id')
      createdId = data.id
      console.info(createdId)

      expect(data).toHaveProperty('type', variableValues.input.type)

      expect(data).toHaveProperty('path', variableValues.input.path)
    })
  })
})
