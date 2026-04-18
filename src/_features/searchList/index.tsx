import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import SearchListCompornent from './component'

type Props = {
  /* 現状なにもしてない */
  onClickAdditionalProcess?: () => void
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchList: React.FC<Props> = _props => {
  const { searchText, searchDay } = useSearchTextContext()

  const { isPending, error, data } = useQuery({
    queryKey: [searchText, searchDay],
    queryFn: () => {
      const result = fetch(`/core/events.json?q=${searchText}${searchDay ? `&startTime=${searchDay}` : ''}`, {
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
    staleTime: 60000, // 60秒は再オープンでのFetchを防止する
  })

  if (searchText === '') {
    return <></>
  }

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
