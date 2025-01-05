import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './_layout'
import { SearchTextProvider } from './_provider/searchTextContext'
//import './App.css';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <SearchTextProvider>
          <LayoutMainConteiner />
        </SearchTextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
