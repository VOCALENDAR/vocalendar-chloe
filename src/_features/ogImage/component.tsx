import { Box } from '@mui/material'
import React from 'react'

type Props = {
  imageURL: string | undefined
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const OgImageComp: React.FC<Props> = React.memo(function OgImageCompInner(props) {
  return props.imageURL ? (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <img src={props.imageURL} />
    </Box>
  ) : (
    <></>
  )
})
export default OgImageComp
