import { Router } from 'express'
// import { pool } from '../../database/db_connection.js'
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from '../controllers/tasks.controllers.js'

const router = Router()

// router.get('/tasks', async (req, res) => {
//   const result = await pool.query('SELECT NOW()')
//   console.log(result)
//   res.send(result.rows[0].now)
// })

router.get('/tasks', getAllTasks)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)

export default router

// I can export the functions using this manner.
// module.exports = router
