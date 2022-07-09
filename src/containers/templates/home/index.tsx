import { CustomButtonInput, EventClickArg, EventInput } from "@fullcalendar/react"
import { useState } from "react"
import Home from "../../../components/templates/home"

/**
 * VOCALENDAR HOMEのコンテナ
 * @returns 
 */
const HomeContainer: React.FC = () => {

  const [isHideLongEvent, setHideLongEvent] = useState(false)

  // Vocalendar Coreからイベントを取得してきた時にCoreとFullcalendarのミスマッチ等を吸収する
  const eventSourceSuccess = (events: EventInput[]) => {
      // TODO 1日より長い期間のあるイベントを除外したい
      events.filter((event)=>{
      // const nextDay = event.setDate(event.getDate() + 1)
      return (!isHideLongEvent) || !event.allday
    })
    // EventDataの書き換えはeventDataTransformでもできる
    .forEach((event) => {
      event.allDay = event.allday;
      event.start = event.start_datetime;
      event.end = event.end_datetime;
      event.title = event.tags[0]?.name + ':' + event.summary;
      if ((!event.allDay) && event.start) {
        // formatDate(event.start,{          
        // })
      }
    })
    return events;
  }


  /**
   * 期間イベントを除外するUIの定義
   */
  const customButton: CustomButtonInput = {
    text: isHideLongEvent ? 'ShowDayEvent' : 'HideDayEvent',
    click: (event) => {
      setHideLongEvent(!isHideLongEvent)
    }

  }

  return <Home
  eventSourceSuccess={eventSourceSuccess}
  customButtons={{customButton}}
  eventClick={(e:EventClickArg)=>{}}
  />
}

export default HomeContainer