import React, { VFC } from 'react';
import FullCalendar, { EventAddArg, EventContentArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

const Vocalendar: VFC = () => {

  const getEvents = (events:EventInput[]) =>{
    // EventDataの書き換えはeventDataTransformでもできる
    events.map(event => {
        event.start = event.start_datetime;
        event.end = event.end_datetime;
        event.title = event.summary;
        })
    return events;
  }
  return (
    <div className="App">
      <FullCalendar 
      plugins={[dayGridPlugin, timeGridPlugin]} 
      initialView="dayGridMonth"
      headerToolbar={{left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek,timeGridWeek,timeGridDay'}}
      navLinks = {true} 
      businessHours = {true}
      displayEventTime = {true}
      dayMaxEventRows = {5}
      editable = {false}
      eventSources = {[
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
        eventSourceSuccess = {getEvents}
        eventSourceFailure = {(error:any) => {
          console.log(error);
        }}      
      />
    </div>
  );
}

export default Vocalendar;
