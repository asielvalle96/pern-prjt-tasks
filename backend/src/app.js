import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import taskRoutes from './routes/tasks.routes.js'

const app = express()

// This is so that Express understands the json object from the Frontend request.
app.use(express.json())

app.use(morgan('dev'))

// Anything domain about Frontend can communicate with this Backend.
app.use(cors())

// Here starts the paths of the CRUD of tasks.
app.use('/api', taskRoutes)

// Middleware, errors handler (implementation).
// This function expects an error to be handled. This error will be sent from the paths in tasks.controllers.js.
app.use((err, req, res, next) => {
  return res.json({ message_from_Backend: err.message })
})

export default app
