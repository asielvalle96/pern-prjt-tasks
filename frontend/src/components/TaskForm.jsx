import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm () {
  const [task, setTask] = useState({
    title: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const [editing, setEditing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() // ❗No re-loading of the page.

    setLoading(true)

    if (editing) {
      const resp = await fetch(`http://localhost:3000/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),

        // ❗I need this so that the Backend understands the JSON sent on the body previous
        // because I'm creating a task. I'm doing a POST method.
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await resp.json()
      console.log('Response of the Backend after ❗PUT fetch (in TaskForm.jsx): ', data)
    } else {
      // fetch, for default, uses the method GET.
      // In this case, I need to use POST. Then, for this, I must add the second parameter.
      const resp = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),

        // ❗I need this so that the Backend understands the JSON sent on the body previous
        // because I'm creating a task. I'm doing a POST method.
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await resp.json()
      console.log('Response of the Backend after ❗POST fetch (in TaskForm.jsx): ', data)
    }

    setLoading(false)

    navigate('/')
  }

  const handleChange = e => {
    // console.log(e.target.name, e.target.value)

    // ❗Anywhere that I'm typing (title or description), the useState will be updated with this info.
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const loadTask = async (id) => {
    const resp = await fetch(`http://localhost:3000/api/tasks/${id}`)
    const data = await resp.json()
    console.log('Data after fetch on loadTask function in TaskForm.jsx: ', data)
    setTask({ title: data.title, description: data.description })
    setEditing(true)
  }

  useEffect(() => {
    // console.log(params)

    if (params.id) {
      loadTask(params.id)
    } else {
      setEditing(false)
      setTask({ title: '', description: '' })
    }
  }, [params.id])

  return (
    // I used this to have a square in the center of the screen.
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#2F9C95', padding: '1rem' }}>
          <Typography variant='5' textAlign='center' color='white'>
            {
              editing ? 'Edit Task' : 'Create Task'
            }
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                // placeholder='testing'
                label='Write the title'
                sx={{ display: 'block', margin: '.5rem 0' }}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                name='title'
                onChange={handleChange}
                value={task.title}
              />
              <TextField
                variant='filled'
                label='Write the description'
                multiline
                rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                name='description'
                onChange={handleChange}
                value={task.description}
              />

              {
                editing
                  ? (
                    <Button variant='contained' color='success' type='submit' disabled={!task.title || !task.description}>
                      {
                        loading ? <CircularProgress color='inherit' size={24} /> : 'Edit'
                      }
                    </Button>)
                  : (
                    <Button variant='contained' color='success' type='submit' disabled={!task.title || !task.description}>
                      {
                        loading ? <CircularProgress color='inherit' size={24} /> : 'Create'
                      }
                    </Button>)
              }
              {/*
                ❗Button is disabled if !title or !description.
                ❗While fetch is processing; loading is true, then, CircularProgress is visible.
              */}
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
