import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './_layout'
import { SearchTextProvider } from './_provider/searchTextContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' //import './App.css';

// Create a client
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SearchTextProvider>
            <LayoutMainConteiner />
          </SearchTextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
