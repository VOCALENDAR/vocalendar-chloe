import React, { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import SearchBoxCompornent from './component'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import { InputProps } from '@mui/material'

type Props = {
  /* 検索ボタンを押した時の追加処理 */
  onClickAdditionalProcess?: () => void
  /* 入力コンポーネントへのパラメータ */
  inputProps?: InputProps
}

/**
 * 検索入力ボックスのコンテナ
 * @returns
 */
const SearchBox: React.FC<Props> = props => {
  const [inputText, setInputText] = useState('')
  const { setSearchText } = useSearchTextContext()
  const onChangehandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      setInputText(event.target.value)
    },
    [setInputText]
  )

  const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    _event => {
      setSearchText(inputText)
      props.onClickAdditionalProcess?.()
    },
    [inputText, setSearchText]
  )

  // イベントの遅延発火
  // TODO 遅延発火は上手くいっているけど、ReactがFullcalendarをイベントで書き換えるので意味がないｗ
  // const [debounceText, setDebounceText] = useState('')
  // const [_isReady, _cancel] = useDebounce(
  //   () => {
  //     setDebounceText(text)
  //   },
  //   1000,
  //   [text]
  // )

  // // コンポーネントレンダリング中に他のコンポーネントの値を書き換えるとエラーになる対応
  // // 参考：https://ja.stackoverflow.com/questions/83569
  useEffect(() => {
    // console.log('useEffect = ', inputText)
    // setSearchText(inputText)
  }, [useSearchTextContext])

  return (
    <SearchBoxCompornent
      onClickHandler={onClickHandler}
      inputProps={{ ...props.inputProps }}
      inputOnchangeHandler={onChangehandler}
      inputValue={inputText}
    />
  )
}

export default SearchBox
