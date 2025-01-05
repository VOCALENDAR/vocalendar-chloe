import { SearchOutlined } from '@mui/icons-material'
import { Box, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React, { ChangeEventHandler } from 'react'

type Props = {
  onChangeHandler: ChangeEventHandler
  textFieldProps?: TextFieldProps
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const SearchBoxCompornent: React.FC<Props> = React.memo(function SearchBoxInner(props) {
  return (
    <>
      <Box sx={{ width: '60%', marginLeft: 'auto' }}>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          placeholder="検索"
          onChange={props.onChangeHandler}
          {...props.textFieldProps}
        />
      </Box>
    </>
  )
})
export default SearchBoxCompornent
