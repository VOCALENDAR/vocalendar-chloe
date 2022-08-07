import FullCalendar, { formatDate, CalendarOptions } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import integrationPlugIn from "@fullcalendar/interaction"
import './fullcalendar.css'

type Props = {

} & Required<Pick<CalendarOptions, 'customButtons' | 'eventSourceSuccess' | 'eventClick' | 'eventSources'>>

/**
 * VOCALENDAR HOMEのView Component
 * @param props 
 * @returns 
 */
const Home: React.FC<Props> = (props) => {

  return <div className="vocalendar-main">
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, integrationPlugIn]}
      initialView="dayGridMonth"
      customButtons={props.customButtons}
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
      eventSources={props.eventSources}
      height={640}
      eventSourceSuccess={props.eventSourceSuccess}
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
      select={(info) => { alert(info) }}

      eventClick={props.eventClick}

    />
  </div>

}

export default Home