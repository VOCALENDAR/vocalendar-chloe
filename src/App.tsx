import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Grid, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { AddTask, Home } from '@mui/icons-material';
import Vocalendar from './Vocalendar';

function App() {
  return (
    <>
    <h1>Vocalendar</h1>
    <BrowserRouter>
        <Grid container >
            <Grid item xs={2}>
            <List>
            <NavLink to="/">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <NavLink to="/add">
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddTask />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </NavLink>
            </List>
           </Grid>
           <Grid item xs={9.8}>
            {/* コンテンツ部分 */}
             <Routes>
                <Route path='/' element={<Vocalendar />} />
            </Routes>
           </Grid>
        </Grid>
        </BrowserRouter>
        </>
  );
}

export default App;
