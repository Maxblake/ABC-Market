import config from './config'
import pg from 'pg-promise'
const pgp = pg()
const db = pgp(process.env.DATABASE_URL || config.dbUrl)
export default db;