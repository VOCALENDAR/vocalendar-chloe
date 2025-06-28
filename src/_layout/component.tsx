import { Notifications } from '@mui/icons-material'
import { AppBar, Badge, Box, Container, IconButton, Link, Toolbar } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import HomeContainer from '../app/home'
import React from 'react'
import SearchBox from '../_features/searchBox'

type Props = object

/**
 * VOCALENDAR Main Layout View
 * @returns
 */
const LayoutMain: React.FC<Props> = React.memo(function LayoutMainInner(_props) {
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
      <Container
        maxWidth={false}
        // component="div"
        className="main"
        sx={{
          p: 0,
          pb: 2,
          marginTop: '60px',
          // flexGrow: 1,
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
            <Route path="/" element={<HomeContainer />} />
          </Routes>
        </Box>
      </Container>
    </>
  )
})

export default LayoutMain
