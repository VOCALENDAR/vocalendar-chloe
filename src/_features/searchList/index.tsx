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

  // TODO 検索条件入力による検索を実施

  // Access the client
  // const queryClient = useQueryClient()
  const { isPending, /**error,*/ data } = useQuery({
    queryKey: [searchText],
    queryFn: () => {
      return fetch(`/core/events.json?q=${searchText}`, {
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
    },
    enabled: !!searchText,
  })

  if (isPending) {
    return 'loading...'
  }
  console.log(data)

  // const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(_event => {
  //   props.onClickAdditionalProcess?.()
  // }, [])

  return <SearchListCompornent />
}

export default SearchList
