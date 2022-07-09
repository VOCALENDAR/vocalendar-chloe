import { BrowserRouter} from 'react-router-dom'
import Layout from './layouts'
//import './App.css';

const App:React.FC = ()=>{
  return <BrowserRouter>
    <Layout />
  </BrowserRouter>
}

export default App;
