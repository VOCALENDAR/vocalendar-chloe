import { AddTask, Home } from "@mui/icons-material"
import { Grid, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import { NavLink, Route, Routes } from "react-router-dom"
import HomeContainer from "../containers/templates/home"

const Layout: React.FC = () => {

  return <>
      <h1>Vocalendar</h1>
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
                <Route path='/' element={<HomeContainer />} />
            </Routes>
           </Grid>
        </Grid>

  
  </>
}

export default Layout