import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
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
  const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      setText(event.target.value ?? '')
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

  // コンポーネントレンダリング中に他のコンポーネントの値を書き換えるとエラーになる対応
  // 参考：https://ja.stackoverflow.com/questions/83569
  const { setSearchText } = useSearchTextContext()
  useEffect(() => {
    setSearchText(debounceText)
  }, [debounceText, useSearchTextContext])

  return <SearchBoxCompornent onChangeHandler={onChangeHandler} {...props.textFieldProps} />
}

export default SearchBox
