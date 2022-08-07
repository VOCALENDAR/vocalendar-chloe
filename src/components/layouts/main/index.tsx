import { AddTask, Home, Notifications, SearchOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Container, Drawer, Grid, IconButton, InputAdornment, Link, List, ListItem, ListItemButton, ListItemIcon, Paper, Stack, TextField, Toolbar } from "@mui/material"
import { NavLink, Route, Routes } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"
import { grey } from "@mui/material/colors"
import HomeContainer from "../../../containers/templates/home"

type Props = {
  searchText?: string 
  searchTextOnChangeHanldler?: React.ChangeEventHandler
}

/**
 * VOCALENDAR Main Layout View
 * @returns 
 */
const LayoutMain: React.FC<Props> = (props) => {

  const drawerWidth = 200
  const [isOpenDrawer, setDrawer] = useState(false)

  return <>
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ boxShadow: 3, backgroundColor: 'white' }}
    >
      <Toolbar style={{ minHeight: '50px', display:'flex' }}>
        <IconButton onClick={(event) => { setDrawer(!isOpenDrawer) }} sx={{ display: { lg: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Box component="img" src="image/vocalendar-titlelogo-revc.png" sx={{ maxHeight: '40px', mr: 2}} />
        </Link>
        <Box sx={{width:'60%', marginLeft:'auto'}}>
          <TextField size="small" fullWidth variant="outlined" 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
              placeholder='検索'
              onChange={props.searchTextOnChangeHanldler}
          />
        </Box>
        <Badge badgeContent={4} color="secondary" sx={{ml:5}}>
          <Notifications sx={{ fontSize: '24px' }} />
        </Badge>
      </Toolbar>
    </AppBar>
    <Drawer anchor="left"
      open={isOpenDrawer}
      onClose={(event, reason) => { setDrawer(!isOpenDrawer) }}
      sx={{ width: `${drawerWidth}px` }}
    >
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
      </Grid>
    </Drawer>
    <Stack direction="row" sx={{ backgroundColor: grey[50], marginTop: '50px' }}>
      <Paper sx={{ display: { xs: 'none', lg: 'block' }, width: `${drawerWidth}px`, p: 1 }}>
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
        </Grid>
      </Paper>
      <Container component="main" sx={{ pb: 2, width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` } }}>
        <Box sx={{
          my: { xs: 1, md: 2 },
          mx: { xs: 0, md: 0 },
          px: { xs: 0, md: 2 },
        }}>
          {/* コンテンツ部分 */}
          <Routes>
            <Route path='/' element={<HomeContainer 
            searchText={props.searchText}
            />} />
          </Routes>
        </Box>
      </Container>
      <Box sx={{ display: { xs: 'none', lg: 'block' }, width: `${drawerWidth}px`, p: 1 }}>
      </Box>
    </Stack>
  </>
}

export default LayoutMain