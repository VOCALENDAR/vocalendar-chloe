import React, { useState } from 'react'
import { useDebounce } from 'react-use'
import LayoutMain, { Event } from './component'

/**
 * VOCALENDAR Main Layoutコンテナ
 * @returns
 */
const LayoutMainConteiner: React.FC = () => {
  const initEvent: Event = { title: '', description: '' }
  const [eventData, setEventData] = useState(initEvent)
  const [isShowEvent, setShowEvent] = useState(false)

  // 上部AppBarの検索Boxの動作設定。
  // TODO 現状Propsを引き回しているのを良しとするか
  const [searchText, setSearchText] = useState('')
  // イベントの遅延発火
  // TODO 遅延発火は上手くいっているけど、ReactがFullcalendarをイベントで書き換えるので意味がないｗ
  const [debounceText, setDebounceText] = useState('')
  const [_isReady, _cancel] = useDebounce(
    () => {
      setDebounceText(searchText)
    },
    1000,
    [searchText]
  )

  const searchTextOnChangeHanldler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(event => {
    setSearchText(event.currentTarget.value ?? '')
  }, [])

  const setShowEventRapper = React.useCallback((isShow: boolean) => {
    setShowEvent(isShow)
  }, [])

  return (
    <LayoutMain
      searchText={debounceText}
      searchTextOnChangeHanldler={searchTextOnChangeHanldler}
      isShowEvent={isShowEvent}
      setShowEvent={setShowEventRapper}
      showEventData={eventData}
      setShowEventData={React.useCallback(event => {
        setEventData(event)
      }, [])}
    />
  )
}

export default LayoutMainConteiner
