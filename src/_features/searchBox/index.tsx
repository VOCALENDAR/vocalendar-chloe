import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import SearchBoxCompornent from './component'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import { InputProps } from '@mui/material'

type Props = {
  onClickHandler?: () => void
  inputProps?: InputProps
}

/**
 * 検索入力ボックスのコンテナ
 * @returns
 */
const SearchBox: React.FC<Props> = props => {
  const [text, setText] = useState('')
  const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    _event => {
      // 暫定
      console.log((document.getElementById('SearchBoxCompornent') as HTMLInputElement).value)
      setText((document.getElementById('SearchBoxCompornent') as HTMLInputElement).value ?? '')
      props.onClickHandler?.()
    },
    [setText]
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
  const { setSearchText } = useSearchTextContext()
  useEffect(() => {
    console.log('useEffect = ', text)
    setSearchText(text)
  }, [useSearchTextContext])

  return <SearchBoxCompornent onClickHandler={onClickHandler} inputProps={{ ...props.inputProps }} />
}

export default SearchBox
