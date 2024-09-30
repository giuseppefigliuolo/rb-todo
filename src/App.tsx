import { ThemeProvider } from '@mui/material'
import './App.css'
import theme from './utils/muiTheme'
import InputSection from './components/InputSection'
import List from './components/List'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <InputSection />
          <List />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
