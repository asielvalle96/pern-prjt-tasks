// dotenv module.
import { config } from 'dotenv'
config()

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
}
// These environment variables come from ".env" file.
//  This uses the "dotenv" module.
//    DB_USER
//    DB_PASSWORD
//    DB_HOST
//    DB_PORT
//    DB_NAME
