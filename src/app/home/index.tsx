import { EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core'
import React, { MouseEventHandler, useCallback, useRef, useState } from 'react'
import Home from './component'
import FullCalendar from '@fullcalendar/react'

export type Event = {
  title: string
  description: string
  location: string
  start: string
}

type Props = object

/**
 * VOCALENDAR HOMEのコンテナ
 * @returns
 */
const HomeContainer: React.FC<Props> = React.memo(function HomeContainerInner(_props) {
  const [isHideLongEvent, setHideLongEvent] = useState(false)
  const [eventData, setEventData] = useState<Event | undefined>(undefined)
  const [calendarTitle, setCalendarTitle] = useState<string | undefined>(undefined)

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
    const api = calendarRef.current?.getApi()
    setCalendarTitle(api?.view.title)
    return events
  }

  /**
   *
   * @param event
   */
  const eventClick = (event: EventClickArg) => {
    setEventData({
      title: event.event.title,
      start: event.event.start?.toISOString() ?? '',
      location: event.event.extendedProps.location,
      description: event.event.extendedProps.description,
    })
  }

  /** FullCalendarを外部から操作するため */
  const calendarRef = useRef<FullCalendar>(null)
  /**
   * 次へ(View依存？例えば月表示の場合には次月が表示される)
   */
  const goNext = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const api = calendarRef.current?.getApi()
    api?.next()
    setCalendarTitle(api?.view.title)
  }, [calendarRef.current])

  /**
   * 前へ(View依存？例えば月表示の場合には次月が表示される)
   */
  const goPrev = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const api = calendarRef.current?.getApi()
    api?.prev()
    setCalendarTitle(api?.view.title)
  }, [calendarRef.current])

  /**
   * 今日に移動するボタン処理
   */
  const goToday = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    const api = calendarRef.current?.getApi()
    api?.today()
    setCalendarTitle(api?.view.title)
  }, [calendarRef.current])

  /**
   * ビュー切り替えボタン処理
   */
  const changeView = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      const api = calendarRef.current?.getApi()
      api?.changeView(event.currentTarget.value)
      setCalendarTitle(api?.view.title)
    },
    [calendarRef.current]
  )

  /**
   * 期間イベントを除外するUIの定義
   */
  const toggleShowDayEvent = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    // text: isHideLongEvent ? 'ShowDayEvent' : 'HideDayEvent',
    setHideLongEvent(prev => {
      return !prev
    })
  }, [calendarRef.current])

  return (
    <Home
      eventSourceSuccess={eventSourceSuccess}
      eventClick={eventClick}
      eventSources={eventSources(/*useSearchTextContext().searchText*/)}
      calendarRef={calendarRef}
      goNext={goNext}
      goPrev={goPrev}
      goToday={goToday}
      calendarTitle={calendarTitle ?? ''}
      showEventData={eventData}
      setShowEventData={setEventData}
      changeView={changeView}
      toggleShowDayEvent={toggleShowDayEvent}
    />
  )
})

export default HomeContainer
