import { CustomButtonInput, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core'
import React, { useState } from 'react'
import { Event } from '../../_layout/component'
import Home from './component'
import { useSearchTextContext } from '../../_provider/searchTextContext'

type Props = {
  setShowEvent: (isShow: boolean) => void
  setShowEventData: (data: Event) => void
}

/**
 * VOCALENDAR HOMEのコンテナ
 * @returns
 */
const HomeContainer: React.FC<Props> = React.memo(function HomeContainerInner(props) {
  const [isHideLongEvent, setHideLongEvent] = useState(false)

  // API発行の設定
  const eventSources = (searchText?: string): EventSourceInput[] => {
    const serchConditon = searchText ? { q: searchText } : {}
    return [
      {
        url: '/core/events.json',
        method: 'GET',
        format: 'json',
        startParam: 'startTime', // URLパラメータに入れる取得開始時間
        endParam: 'endTime',
        extraParams: {
          ...serchConditon,
          order: '1',
        },
      },
    ]
  }

  // Vocalendar Coreからイベントを取得してきた時にCoreとFullcalendarのミスマッチ等を吸収する
  const eventSourceSuccess = (events: EventInput[]) => {
    // TODO 1日より長い期間のあるイベントを除外したい
    events
      .filter(event => {
        // const nextDay = event.setDate(event.getDate() + 1)
        return !isHideLongEvent || !event.allday
      })
      // EventDataの書き換えはeventDataTransformでもできる
      .forEach(event => {
        event.allDay = event.allday
        event.start = event.start_datetime
        event.end = event.end_datetime
        event.title = event.tags[0]?.name + ':' + event.summary
        if (!event.allDay && event.start) {
          // formatDate(event.start,{
          // })
        }
      })
    return events
  }

  /**
   * 期間イベントを除外するUIの定義
   */
  const showDayEvent: CustomButtonInput = {
    text: isHideLongEvent ? 'ShowDayEvent' : 'HideDayEvent',
    click: _event => {
      setHideLongEvent(!isHideLongEvent)
    },
  }

  /**
   * リフレッシュボタン
   */
  const refreshEvent: CustomButtonInput = {
    text: 'reflesh',
    click: _event => {
      // setHideLongEvent(!isHideLongEvent)
    },
  }

  const eventClick = (event: EventClickArg) => {
    props.setShowEvent(true)
    props.setShowEventData({
      title: event.event.title,
      start: event.event.start?.toISOString() ?? '',
      location: event.event.extendedProps.location,
      description: event.event.extendedProps.description,
    })
  }

  const { searchText } = useSearchTextContext()

  return (
    <Home
      eventSourceSuccess={eventSourceSuccess}
      customButtons={{ showDayEvent: showDayEvent, refreshEvent: refreshEvent }}
      eventClick={eventClick}
      eventSources={eventSources(searchText)}
    />
  )
})

export default HomeContainer
