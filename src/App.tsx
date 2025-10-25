import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './_layout'
import { SearchTextProvider } from './_provider/searchTextContext'
import { AppQueryProvider } from './_provider/appQuery'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AppQueryProvider>
          <SearchTextProvider>
            <LayoutMainConteiner />
          </SearchTextProvider>
        </AppQueryProvider>
      </BrowserRouter>
    </>
  )
}

export default App
