import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../app/home'
import React from 'react'

type Props = object

/**
 * VOCALENDAR Main Layout View
 * @returns
 */
const LayoutMain: React.FC<Props> = React.memo(function LayoutMainInner(_props) {
  return (
    <>
      <Container
        maxWidth={false}
        // component="div"
        className="main"
        sx={{
          p: 0,
          pb: 2,
          marginTop: '5px',
          // flexGrow: 1,
          // display: 'flex',
          // flexDirection: 'row',
        }}
      >
        {/* コンテンツ部分 */}
        <Routes>
          <Route path="/" element={<HomeContainer />} />
        </Routes>
      </Container>
    </>
  )
})

export default LayoutMain
