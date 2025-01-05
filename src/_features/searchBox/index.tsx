import React, { ChangeEventHandler, useCallback, useState } from 'react'
import { useDebounce } from 'react-use'
import SearchBoxCompornent from './component'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import { TextFieldProps } from '@mui/material'

type Props = {
  textFieldProps?: TextFieldProps
}

/**
 * 検索入力ボックスのコンテナ
 * @returns
 */
const SearchBox: React.FC<Props> = props => {
  const [text, setText] = useState('')
  const onChangeHandler = useCallback<ChangeEventHandler>(
    event => {
      setText(event.currentTarget.textContent ?? '')
    },
    [setText]
  )
  // イベントの遅延発火
  // TODO 遅延発火は上手くいっているけど、ReactがFullcalendarをイベントで書き換えるので意味がないｗ
  const [debounceText, setDebounceText] = useState('')
  const [_isReady, _cancel] = useDebounce(
    () => {
      setDebounceText(text)
    },
    1000,
    [text]
  )

  const { text: _searchText, setText: setSearchText } = useSearchTextContext()
  setSearchText(debounceText)

  return <SearchBoxCompornent onChangeHandler={onChangeHandler} {...props.textFieldProps} />
}

export default SearchBox
