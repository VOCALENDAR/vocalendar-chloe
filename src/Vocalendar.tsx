import React, { useRef, VFC } from 'react';
import FullCalendar, { CustomButtonInput, EventInput, } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

const Vocalendar: VFC = () => {

  // FullCalendarのインスタンスを取得
  const calendarRef = useRef<FullCalendar>(null!)

  const getEvents = (events: EventInput[]) => {
    // EventDataの書き換えはeventDataTransformでもできる
    events.forEach((event) => {
      event.allDay = event.allday;
      event.start = event.start_datetime;
      event.end = event.end_datetime;
      event.title = event.summary;
      if ((!event.allDay) && event.start) {
        //formatDate(event.start,"yyyy/mm/dd")
      }
    })

    return events;
  }

  const customButton: CustomButtonInput = {
    text: 'TEST',
    click: (event) => {
      alert("a")
      //うごかない
      customButton.text = 'CLICK'
      // 現在未使用
      calendarRef.current.getApi()
    }

  }

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
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
            url: 'http://localhost:3000/core/events.json',
            method: 'GET',
            format: 'json',
            startParam: 'startTime', // URLパラメータに入れる取得開始時間
            endParam: 'endTime',
            extraParams: {
              order: '1'
            }
          }
        ]}
        eventSourceSuccess={getEvents}
        eventSourceFailure={(error: any) => {
          console.log(error);
        }}

      />
    </div>
  );
}

export default Vocalendar;
