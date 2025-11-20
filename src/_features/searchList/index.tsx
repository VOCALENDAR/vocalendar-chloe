import React, { useCallback } from 'react'
import SearchListCompornent from './component'
import { useQuery } from '@tanstack/react-query'
import { useSearchTextContext } from '../../_provider/searchTextContext'
import { Event } from '../../app/types/event'

type Props = {
  /* 検索ボタンを押した時の追加処理 */
  onClickAdditionalProcess?: () => void
  setShowEventData: React.Dispatch<React.SetStateAction<Event | undefined>>
}

/**
 * 検索一覧のコンテナ
 * @returns
 */
const SearchList: React.FC<Props> = props => {
  const { searchText } = useSearchTextContext()

  //  const onClickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
  const onClickHandler = useCallback(
    (event: Event) => {
      props.setShowEventData(event)
    },
    [props.setShowEventData]
  )

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

  return <SearchListCompornent events={data} onClickEventHandler={onClickHandler} />
}

export default SearchList
