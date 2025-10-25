import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {
  zantei?: string
  events: {
    summary: string
  }[]
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchListCompornent: React.FC<Props> = React.memo(function SearchBoxInner(_props) {
  const [openSearchDetail, setOpenSearchDeteil] = useState(false)
  return (
    <>
      <Stack direction={'row'} spacing={2}>
        <Paper sx={{ maxWidth: '600px' }}>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>イベント一覧</Typography>
          </div>
          <div
            onClick={() => {
              setOpenSearchDeteil(true)
            }}
          >
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>イベント内容</Typography>
            </div>
            {_props.events?.map((event, index) => (
              <Paper key={index} sx={{ maxWidth: '600px' }}>
                <div>
                  <Typography sx={{ fontWeight: 'bold' }}>{event.summary}</Typography>
                </div>
                <div>
                  <Typography>{event.summary}</Typography>
                </div>
              </Paper>
            ))}
          </div>
        </Paper>
        {openSearchDetail && (
          <Paper sx={{ maxWidth: '600px' }}>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>イベントタイトル</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>イベント内容</Typography>
            </div>
          </Paper>
        )}
      </Stack>
    </>
  )
})
export default SearchListCompornent
