import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

type Props = {
  zantei?: string
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
          <div
            onClick={() => {
              setOpenSearchDeteil(true)
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>イベント一覧</Typography>
          </div>
          <div>
            <Typography sx={{ fontWeight: 'bold' }}>イベント一覧サンプル</Typography>
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
