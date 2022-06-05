import { DataSource } from 'typeorm'
import entities from '../../entities'
import migrations from '../../migrations'

export const createTestConnection = () => {
  try {
    return new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 54321,
      username: process.env.DB_USERNAME || 'test',
      password: process.env.DB_PASSWORD || 'test-pwd',
      database: process.env.DB_NAME || 'test',
      synchronize: true,
      dropSchema: true,
      entities,
      subscribers: [],
      migrations,
      useUTC: true,
    })
  } catch (error) {
    console.error('Error during Data Source initialization 💩', error)
  }
}
