import { Avatar, Button, FormControl, Input, InputProps } from '@mui/material'
import React, { MouseEventHandler } from 'react'

type Props = {
  /* 検索ボタン押した時のハンドラ */
  onClickHandler: MouseEventHandler<HTMLButtonElement>
  /* Inputコンポーネントへのパラメータ */
  inputProps?: InputProps
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
          endAdornment={
            <Button
              type="submit"
              variant="text"
              startIcon={<Avatar src={'./button.search.png'} />}
              onSubmit={props.onClickHandler}
              onClick={props.onClickHandler}
            ></Button>
          }
          {...props.inputProps}
        />
      </FormControl>
    </>
  )
})
export default SearchBoxCompornent
