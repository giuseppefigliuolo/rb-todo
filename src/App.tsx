import { ThemeProvider } from '@mui/material'
import './App.css'
import theme from './utils/muiTheme'
import InputSection from './components/InputSection'
import List from './components/List'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import redboxLogo from '/logo.svg'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <main className="max-w-[1200px] mx-auto">
            <div className="flex flex-col p-4 justify-evenly items-center">
              <a href="https://redboxmobile.com/" target="_blank">
                <img src={redboxLogo} alt="Redbox logo" width={'200px'} />
              </a>
              <h1 className="mt-4 font-bold text-2xl">Todo List</h1>
            </div>
            <InputSection />
            <List />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
