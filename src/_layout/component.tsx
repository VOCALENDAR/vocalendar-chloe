import { AddTask, Home, Notifications } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { NavLink, Route, Routes } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { grey } from '@mui/material/colors'
import HomeContainer from '../app/home'
import React from 'react'
import OgImage from '../_features/ogImage'
import SearchBox from '../_features/searchBox'

export type Event = {
  title: string
  description: string
  location: string
  start: string
}
type Props = {
  isShowEvent: boolean
  setShowEvent: (isShow: boolean) => void
  showEventData: Event
  setShowEventData: (data: Event) => void
}

/**
 * VOCALENDAR Main Layout View
 * @returns
 */
const LayoutMain: React.FC<Props> = React.memo(function LayoutMainInner(props) {
  const drawerWidth = 200
  const [isOpenDrawer, setDrawer] = useState(false)

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0} sx={{ boxShadow: 3, backgroundColor: 'white' }}>
        <Toolbar style={{ minHeight: '50px', display: 'flex' }}>
          <IconButton
            onClick={_event => {
              setDrawer(!isOpenDrawer)
            }}
            sx={{ display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Box component="img" src="image/vocalendar-titlelogo-revc.png" sx={{ maxHeight: '40px', mr: 2 }} />
          </Link>
          <Box sx={{ width: '60%', marginLeft: 'auto' }}>
            <SearchBox />
          </Box>
          <Badge badgeContent={4} color="secondary" sx={{ ml: 5 }}>
            <Notifications sx={{ fontSize: '24px' }} />
          </Badge>
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ backgroundColor: grey[50], marginTop: '50px' }}>
        <Paper
          sx={{
            display: { xs: 'none', lg: 'block' },
            width: `${drawerWidth}px`,
          }}
        >
          <Grid container>
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
        <Container
          // component="div"
          className="main"
          sx={{
            m: 0,
            p: 0,
            pb: 2,
            // width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` },
            flexGrow: 1,
            // display: 'flex',
            // flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              my: { xs: 1, md: 2 },
              mx: { xs: 0, md: 0 },
              px: { xs: 0, md: 0 },
              // flexGrow:1
            }}
          >
            {/* コンテンツ部分 */}
            <Routes>
              <Route
                path="/"
                element={<HomeContainer setShowEvent={props.setShowEvent} setShowEventData={props.setShowEventData} />}
              />
            </Routes>
          </Box>
        </Container>
        <Box
          component="div"
          sx={{
            display: { xs: 'none', lg: 'block' },
            m: 0,
            p: 0,
            width: `600px`,
            minHeight: '640px',
            backgroundImage: 'url("image/vocalendar-elrowa-mikuoriginal.png")',
            backgroundSize: 'cover',
          }}
        ></Box>
      </Stack>
      <Drawer
        anchor="left"
        open={isOpenDrawer}
        onClose={(_event, _reason) => {
          setDrawer(!isOpenDrawer)
        }}
        sx={{ width: `${drawerWidth}px` }}
      >
        <Grid container>
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
      <Drawer
        anchor="right"
        open={props.isShowEvent}
        onClose={(_event, _reason) => {
          props.setShowEvent(!props.isShowEvent)
        }}
        sx={{ width: `${drawerWidth}px` }}
      >
        <Paper sx={{ maxWidth: '600px' }}>
          <OgImage siteURL={'https://piapro.net/miku16thbd/'}></OgImage>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>イベント</Typography>
          </div>
          <div>
            <Typography>{props.showEventData.title}</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>場所</Typography>
          </div>
          <div>
            <Typography>{props.showEventData.location}</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>日時</Typography>
          </div>
          <div>
            <Typography>{props.showEventData.start}</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>詳細</Typography>
          </div>
          <div>
            <Typography>{props.showEventData.description}</Typography>
          </div>
        </Paper>
      </Drawer>
    </>
  )
})

export default LayoutMain
