import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './_layout';
//import './App.css';

const App: React.FC = () => {
  return <>
    <BrowserRouter>
      <CssBaseline />
      <LayoutMainConteiner />
    </BrowserRouter>
  </>
}

export default App;
