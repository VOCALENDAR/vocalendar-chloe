import React, { useState } from 'react'
import LayoutMain, { Event } from './component'

/**
 * VOCALENDAR Main Layoutコンテナ
 * @returns
 */
const LayoutMainConteiner: React.FC = () => {
  const initEvent: Event = { title: '', description: '', start: '', location: '' }
  const [eventData, setEventData] = useState(initEvent)
  const [isShowEvent, setShowEvent] = useState(false)

  const setShowEventRapper = React.useCallback((isShow: boolean) => {
    setShowEvent(isShow)
  }, [])

  return (
    <LayoutMain
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
