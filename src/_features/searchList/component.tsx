import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSearchListSelectedContext } from '../../_provider/searchListSelectedContext'
import { Event } from '../../app/types/event'

type Props = {
  events: Event[]
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchListCompornent: React.FC<Props> = React.memo(function SearchBoxInner(_props) {
  const [openSearchDetail, setOpenSearchDeteil] = useState(false)
  const { setSelectedEvent } = useSearchListSelectedContext()

  return (
    <>
      <Box
        sx={{
          maxWidth: '600px',
          marginRight: `${openSearchDetail ? '600px' : '0'}`,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <Stack direction={'column'} spacing={2}>
          {_props.events?.map((event, index) => (
            <Paper key={index} sx={{ maxWidth: '600px' }}>
              <div
                onClick={() => {
                  setOpenSearchDeteil(true)
                  setSelectedEvent(event)
                }}
              >
                <div>
                  <Typography sx={{ fontWeight: 'bold' }}>{event.summary}</Typography>
                </div>
                <div>
                  <Typography>{event.description}</Typography>
                </div>
              </div>
              <Divider />
            </Paper>
          ))}
        </Stack>
      </Box>
    </>
  )
})
export default SearchListCompornent
