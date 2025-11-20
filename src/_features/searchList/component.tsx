import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import OgImage from '../ogImage'
import { Event } from '../../app/types/event'

type Props = {
  events: Event[]
  onClickEventHandler: (event: Event) => void
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchListCompornent: React.FC<Props> = React.memo(function SearchBoxInner(_props) {
  const [openSearchDetail, setOpenSearchDeteil] = useState(false)
  const [eventData, setEventData] = useState<Event | undefined>(undefined)

  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <Paper sx={{ maxWidth: '600px', marginRight: `${openSearchDetail ? '600px' : '0'}` }}>
          {_props.events?.map((event, index) => (
            <Paper key={index} sx={{ maxWidth: '600px' }}>
              <div
                onClick={() => {
                  setOpenSearchDeteil(true)
                  setEventData(event)
                  // _props.onClickEventHandler(event)
                }}
              >
                <div>
                  <Typography sx={{ fontWeight: 'bold' }}>{event.summary}</Typography>
                </div>
                <div>
                  <Typography>{event.description}</Typography>
                </div>
              </div>
            </Paper>
          ))}
        </Paper>
        {openSearchDetail && eventData && (
          <Paper sx={{ maxWidth: '600px' }}>
            <OgImage siteURL={'https://piapro.net/miku16thbd/'}></OgImage>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>イベント</Typography>
            </div>
            <div>
              <Typography>{eventData.summary}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>場所</Typography>
            </div>
            <div>
              <Typography>{eventData.location}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>日時</Typography>
            </div>
            <div>
              <Typography>{eventData.start}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>詳細</Typography>
            </div>
            <div>
              <Typography>{eventData.description}</Typography>
            </div>
          </Paper>
        )}
      </Stack>
    </>
  )
})
export default SearchListCompornent
