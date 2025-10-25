import React from 'react'
import { InputProps } from '@mui/material'
import SearchListCompornent from './component'
import { useQuery } from '@tanstack/react-query'
import { useSearchTextContext } from '../../_provider/searchTextContext'

type Props = {
  /* 検索ボタンを押した時の追加処理 */
  onClickAdditionalProcess?: () => void
  /* 入力コンポーネントへのパラメータ */
  inputProps?: InputProps
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchList: React.FC<Props> = _props => {
  const { searchText } = useSearchTextContext()

  const { isPending, error, data } = useQuery({
    queryKey: [searchText],
    queryFn: () => {
      const result = fetch(`/core/events.json?q=${searchText}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async res => {
        if (!res.ok) {
          throw new Error('response error')
        }
        const data = await res.json()
        return data
      })
      console.log(result)
      return result
    },
    enabled: !!searchText,
  })

  if (isPending) {
    return 'loading...'
  }
  if (error) {
    return 'error...'
  }
  console.log(data)

  // const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(_event => {
  //   props.onClickAdditionalProcess?.()
  // }, [])

  return <SearchListCompornent events={data} />
}

export default SearchList
