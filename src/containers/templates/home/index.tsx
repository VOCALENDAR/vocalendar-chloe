import { CustomButtonInput, EventClickArg, EventInput, EventSourceInput } from "@fullcalendar/react"
import { useState } from "react"
import Home from "../../../components/templates/home"


type Props = {
  searchText?: string
}

/**
 * VOCALENDAR HOMEのコンテナ
 * @returns 
 */
const HomeContainer: React.FC<Props>= (props) => {

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

  const eventSources = (searchText?:string):EventSourceInput[] =>{

    const serchConditon = searchText ? {q:searchText}: {}

    return [
    {
      url: 'core/events.json',
      method: 'GET',
      format: 'json',
      startParam: 'startTime', // URLパラメータに入れる取得開始時間
      endParam: 'endTime',
      extraParams: {
        order: '1'
      } && serchConditon
    }
  ]}

  return <Home
  eventSourceSuccess={eventSourceSuccess}
  customButtons={{customButton}}
  eventClick={(e:EventClickArg)=>{}}
  eventSources={eventSources(props.searchText)}
  />
}

export default HomeContainer