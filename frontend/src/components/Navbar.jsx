import { Box, AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar () {
  const navigate = useNavigate()
  return (
    // It's a square.
    <Box sx={{ flexGrow: 1 }}>

      {/* It's to have a navigation. */}
      <AppBar position='static' color='transparent'>

        {/* It's a container. */}
        <Container>

          {/* It's to put options. */}
          <Toolbar>

            {/* It's to put texts. */}
            <Typography sx={{ flexGrow: 1 }} variant='h6'>
              <Link to='/' style={{ color: '#eee' }}>PERN Stack</Link>
            </Typography>

            <Button variant='contained' color='success' onClick={() => navigate('/tasks/new')}>New Task</Button>
          </Toolbar>

        </Container>

      </AppBar>

    </Box>
  )
}
