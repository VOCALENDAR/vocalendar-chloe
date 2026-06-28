import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Avatar, Button, Collapse, FormControl, IconButton, Input, InputProps, Stack } from '@mui/material'
import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'

type Props = {
  /* 検索ボタン押した時のハンドラ */
  onClickHandler: (e: React.SyntheticEvent) => void
  /* Inputコンポーネントへのパラメータ */
  inputProps?: InputProps
  inputOnchangeHandler: ChangeEventHandler
  inputValue: string
  dateOnChangeHandler: (value: PickerValue, context: PickerChangeHandlerContext<DateValidationError>) => void
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const SearchBoxCompornent: React.FC<Props> = React.memo(function SearchBoxInner(props) {
  const [openDatePicker, setOpenDatePicker] = useState(false)

  return (
    <>
      <FormControl fullWidth>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Input
            id="SearchBoxCompornent"
            type="text"
            endAdornment={
              <Button
                type="submit"
                variant="text"
                startIcon={<Avatar src={'./button.search.png'} />}
                onSubmit={props.onClickHandler as MouseEventHandler<HTMLButtonElement>}
                onClick={props.onClickHandler as MouseEventHandler<HTMLButtonElement>}
              ></Button>
            }
            // {...props.inputProps}
            value={props.inputValue}
            onChange={props.inputOnchangeHandler}
            onKeyDown={e => e.key === 'Enter' && props.onClickHandler(e)}
            fullWidth
          />
          <IconButton onClick={() => setOpenDatePicker(!openDatePicker)}>
            {openDatePicker ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
        <Collapse in={openDatePicker}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format="YYYY/MM/DD" onChange={props.dateOnChangeHandler} defaultValue={dayjs()} />
          </LocalizationProvider>
        </Collapse>
      </FormControl>
    </>
  )
})
export default SearchBoxCompornent
