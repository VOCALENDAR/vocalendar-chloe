import { AddTask, Home, Notifications, SearchOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Container, Drawer, Grid, IconButton, InputAdornment, Link, List, ListItem, ListItemButton, ListItemIcon, Paper, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { NavLink, Route, Routes } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react"
import { grey } from "@mui/material/colors"
import HomeContainer from "../../../containers/templates/home"
import React from "react"

export type Event = {
  title: string
  description: string
}
type Props = {
  searchText?: string
  searchTextOnChangeHanldler?: React.ChangeEventHandler
  isShowEvent: boolean
  setShowEvent: (isShow: boolean) => void
  showEventData: Event
  setShowEventData: (data: Event) => void
}

/**
 * VOCALENDAR Main Layout View
 * @returns 
 */
const LayoutMain: React.FC<Props> = React.memo((props) => {

  const drawerWidth = 200
  const [isOpenDrawer, setDrawer] = useState(false)

  return <>
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ boxShadow: 3, backgroundColor: 'white' }}
    >
      <Toolbar style={{ minHeight: '50px', display: 'flex' }}>
        <IconButton onClick={(event) => { setDrawer(!isOpenDrawer) }} sx={{ display: { lg: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Box component="img" src="image/vocalendar-titlelogo-revc.png" sx={{ maxHeight: '40px', mr: 2 }} />
        </Link>
        <Box sx={{ width: '60%', marginLeft: 'auto' }}>
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
        <Badge badgeContent={4} color="secondary" sx={{ ml: 5 }}>
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
      <Paper sx={{ display: { xs: 'none', lg: 'block' }, width: `${drawerWidth}px` }}>
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
      <Container component="main" sx={{ m: 0, p: 0, pb: 2, width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` } }}>
        <Box sx={{
          my: { xs: 1, md: 2 },
          mx: { xs: 0, md: 0 },
          px: { xs: 0, md: 0 },
        }}>
          {/* コンテンツ部分 */}
          <Routes>
            <Route path='/' element={<HomeContainer
              searchText={props.searchText}
              setShowEvent={props.setShowEvent}
              setShowEventData={props.setShowEventData}
            />} />
          </Routes>
        </Box>
      </Container>
      <Drawer anchor="right"
        open={props.isShowEvent}
        onClose={(event, reason) => { props.setShowEvent(!props.isShowEvent) }}
        sx={{ width: `${drawerWidth}px` }}
      >
        <Paper>
        <div>
            <Typography sx={{fontWeight:'bold'}}>イベント</Typography>
          </div>
          <div>
            <Typography>{props.showEventData.title}</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>場所</Typography>
          </div>
          <div>
            <Typography>だみー</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>日時</Typography>
          </div>
          <div>
          <Typography>だみー</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>詳細</Typography>
          </div>
          <div>
          <Typography>{props.showEventData.description}</Typography>
          </div>
        </Paper>

      </Drawer>
      <Box sx={{
        display: { xs: 'none', lg: 'block' }, width: `${drawerWidth}px`, m: 0, p: 0,
        backgroundImage: 'image\vocalendar-elrowa-mikuoriginal.png'
      }}>
        <img src="image\vocalendar-elrowa-mikuoriginal.png" />
      </Box>
    </Stack>
  </>
})

export default LayoutMain