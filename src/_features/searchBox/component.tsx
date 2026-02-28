import { Avatar, Button, FormControl, Input, InputProps } from '@mui/material'
import React, { ChangeEventHandler, MouseEventHandler } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

type Props = {
  /* 検索ボタン押した時のハンドラ */
  onClickHandler: MouseEventHandler<HTMLButtonElement>
  /* Inputコンポーネントへのパラメータ */
  inputProps?: InputProps
  inputOnchangeHandler: ChangeEventHandler
  inputValue: string
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const SearchBoxCompornent: React.FC<Props> = React.memo(function SearchBoxInner(props) {
  return (
    <>
      <FormControl fullWidth>
        <Input
          id="SearchBoxCompornent"
          type="text"
          endAdornment={
            <Button
              type="submit"
              variant="text"
              startIcon={<Avatar src={'./button.search.png'} />}
              onSubmit={props.onClickHandler}
              onClick={props.onClickHandler}
            ></Button>
          }
          // {...props.inputProps}
          value={props.inputValue}
          onChange={props.inputOnchangeHandler}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </FormControl>
    </>
  )
})
export default SearchBoxCompornent
