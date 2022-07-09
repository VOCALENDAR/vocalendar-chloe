import React, { useRef, useState, VFC } from 'react';
import FullCalendar, { CustomButtonInput, EventInput, formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import integrationPlugIn from "@fullcalendar/interaction"
import { info } from 'console';

const Vocalendar: VFC = () => {

  const [isHideLongEvent, setHideLongEvent] = useState(false)

  // FullCalendarのインスタンスを取得
  // const calendarRef = useRef<FullCalendar>(null!)

  const getEvents = (events: EventInput[]) => {

    // EventDataの書き換えはeventDataTransformでもできる
    events.filter((event)=>{
      // TODO 1日より長い期間のあるイベントを除外したい
      // const nextDay = event.setDate(event.getDate() + 1)
      return (!isHideLongEvent) || !event.allday
    })
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

  const customButton: CustomButtonInput = {
    text: 'HideDayEvent',
    click: (event) => {
      setHideLongEvent(!isHideLongEvent)
    }

  }

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, integrationPlugIn]}
        initialView="dayGridMonth"
        customButtons={{ customButton }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'customButton dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay'
        }}
        navLinks={true}
        businessHours={true}
        displayEventTime={true}
        dayMaxEventRows={5}
        editable={false}
        //events = {(info, succesCallback, failureCallback)=>{}}
        eventSources={[
          {
            url: 'core/events.json',
            method: 'GET',
            format: 'json',
            startParam: 'startTime', // URLパラメータに入れる取得開始時間
            endParam: 'endTime',
            extraParams: {
              order: '1'
            }
          }
        ]}
        height={480}
        eventSourceSuccess={getEvents}
        eventSourceFailure={(error: any) => {
          console.log(error);
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false
        }}
        // うごかない？
        selectable={true}
        select={(info)=>{alert(info)}}

        eventClick={(e)=>{alert(e)}}

      />
    </div>
  );
}

export default Vocalendar;
