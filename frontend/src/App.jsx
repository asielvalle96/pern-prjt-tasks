import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TasksList from './components/TasksList.jsx'
import TaskForm from './components/TaskForm.jsx'
import Navbar from './components/Navbar.jsx'
import { Container } from '@mui/material'

export const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Container> {/* Component from Material UI */}
        <Routes>
          <Route path='/' element={<TasksList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
      </Container>

    </BrowserRouter>
  )
}
