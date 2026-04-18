import { InputProps } from '@mui/material'
import { PickerValue } from '@mui/x-date-pickers/internals'
import React, { ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import SearchBoxCompornent from './component'

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
  const [dateValue, setDateValue] = useState<PickerValue>(null)
  const { setSearchText, setSearchDay } = useSearchTextContext()
  const onChangehandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      setInputText(event.target.value)
    },
    [setInputText]
  )

  const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    _event => {
      setSearchText(inputText)
      setSearchDay(dateValue ? dateValue.format('YYYY/MM/DD') : undefined)
      props.onClickAdditionalProcess?.()
    },
    [inputText, dateValue, setSearchText, setSearchDay]
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
      dateOnChangeHandler={setDateValue}
    />
  )
}

export default SearchBox
