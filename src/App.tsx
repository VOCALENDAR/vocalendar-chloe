import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'
import LayoutMainConteiner from './containers/layouts/main';
//import './App.css';

const App: React.FC = () => {
  return <BrowserRouter>
    <CssBaseline />
    <LayoutMainConteiner />
  </BrowserRouter>
}

export default App;
