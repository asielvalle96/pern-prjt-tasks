import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function TasksList () {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const resp = await fetch('http://localhost:3000/api/tasks')
        const data = await resp.json()

        console.log('Response of fetch. An array with objects tasks: ', data)

        setTasks(data)
      } catch (error) {
        console.log('Error from TasksList.jsx: ', error)
      }
    }

    loadTasks()
  }, [])

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE'
      })
      console.log('Info about fetch after delete (in TaskList.jsx): ', resp)

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  if (tasks.message_from_Backend) {
    return (
      <div>Run "docker-compose.yml" to connect to the DB</div>
    )
  }

  return (
    <>
      Task List
      {
        tasks.map(task => (
          <Card key={task.id} sx={{ mt: '.7rem', background: '#85BDA6' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>

              <div>
                <Button
                  variant='contained' color='inherit' onClick={() => navigate(`/tasks/${task.id}/edit`)} style={{ marginRight: '.5rem' }}
                >
                  Edit
                </Button>

                <Button
                  variant='contained' color='error' onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}
