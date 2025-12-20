import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './_layout'
import { AppQueryProvider } from './_provider/appQuery'
import { SearchListSelectedProvider } from './_provider/searchListSelectedContext'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AppQueryProvider>
          <SearchListSelectedProvider>
            <LayoutMainConteiner />
          </SearchListSelectedProvider>
        </AppQueryProvider>
      </BrowserRouter>
    </>
  )
}

export default App
