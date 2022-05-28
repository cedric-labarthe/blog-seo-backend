import { DataSource, ConnectionOptionsReader } from 'typeorm'

import entities from '../entities'
import migrations from '../migrations'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities,
  subscribers: [],
  migrations,
  useUTC: true,
})
