import { db } from './config.js'

import pkg from 'pg'
// Pool receives an object with connection parameters.
const { Pool } = pkg
export const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database
})

pool.on('connect', () => console.log('DB connected'))

// console.log('pool ', pool)
// console.log('Testing ', process.env.DB_PASSWORD)
