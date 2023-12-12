// In the queries I use:
//    RETURNING * ➡️ To show all the information of the query using console.log(result).

// Middleware, errors handler from Express.
//  ✅ In the try sentences:
//    1️⃣ throw new Error('An error occurred.') ---- Send the error to "Middleware, errors handler (implementation)" on app.js.
//  ✅ In the catch sentences:
//    1️⃣ next(error) ------------------------------ Send the error to "Middleware, errors handler (implementation)" on app.js.
//    2️⃣ res.json({ Error: error.message }) ------- Send the error to Frontend. ❗A good idea is sending this to Frontend on Development Mode and sending some 500 error on Production Mode.
//    3️⃣ console.log(error.message) --------------- Send the errors to the terminal.

import { pool } from '../../database/db_connection.js'

export const getAllTasks = async (req, res, next) => {
  // res.send('List of tasks.')

  try {
    const allTasks = await pool.query('SELECT * FROM task')
    console.log(allTasks.rows)
    res.json(allTasks.rows)
  } catch (error) {
    next(error)
  }
}

export const getTask = async (req, res, next) => {
  // res.send('Retrieving a single task.')

  try {
    const { id } = req.params
    const task = await pool.query('SELECT * FROM task WHERE id = $1', [id])
    if (task.rows.length === 0) return res.status(404).json({ Message: 'Task not found.' })

    res.json(task.rows[0])
  } catch (error) {
    next(error)
  }
}

export const createTask = async (req, res, next) => {
  // res.send('Create task.')

  const { title, description } = req.body

  try {
    const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description])
    console.log(result)

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  // res.send('Delete a tasks.')

  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM task WHERE id = $1', [id])
    console.log(result)

    if (result.rowCount === 0) return res.status(404).json({ message: 'Task not found.' })

    //  It was well. Just that there isn't a response to send to the Frontend after delete.
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  // res.send('Updating a task.')

  try {
    const { id } = req.params
    const { title, description } = req.body
    console.log(id, title, description)
    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])

    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found.' })

    console.log(result)
    return res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// I can export the functions using this manner ⬇️.

// module.exports = {
//   getAllTasks, /* Or only put. ➡️ */ getAllTasks: getAllTasks,
//   getTask,
//   createTask,
//   deleteTask,
//   updateTask
// }
