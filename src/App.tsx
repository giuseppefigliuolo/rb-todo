import { Button, ThemeProvider } from '@mui/material'
import './App.css'
import theme from './utils/muiTheme'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <h1>Hello</h1>
        <Button variant="contained">Hello world</Button>
      </ThemeProvider>
    </>
  )
}

export default App
