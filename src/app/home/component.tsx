import FullCalendar from '@fullcalendar/react'
import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import integrationPlugIn from '@fullcalendar/interaction'
import './fullcalendar.css'
import { Box, Button } from '@mui/material'
import { MouseEventHandler } from 'react'

type Props = {
  calendarRef: React.RefObject<FullCalendar>
  goNext: MouseEventHandler<HTMLButtonElement>
  goPrev: MouseEventHandler<HTMLButtonElement>
} & Required<Pick<CalendarOptions, 'customButtons' | 'eventSourceSuccess' | 'eventClick' | 'eventSources'>>

/**
 * VOCALENDAR HOMEのView Component
 * @param props
 * @returns
 */
const Home: React.FC<Props> = props => {
  // TODO FullcalendarがAPIを2回発行するのでなんとかしたい
  return (
    <>
      <Box className="vocalendar-main">
        <Button variant="contained" onClick={props.goPrev}>
          Prev
        </Button>
        <Button variant="contained" onClick={props.goNext}>
          Next
        </Button>
        <FullCalendar
          ref={props.calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, integrationPlugIn]}
          initialView="dayGridMonth"
          customButtons={props.customButtons}
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay showDayEvent refreshEvent',
          }}
          navLinks={true}
          businessHours={true}
          displayEventTime={true}
          dayMaxEventRows={5} // contentHeight と一緒に計算する必要あり
          editable={false}
          //events = {(info, succesCallback, failureCallback)=>{}}
          eventSources={props.eventSources}
          eventSourceSuccess={props.eventSourceSuccess}
          eventSourceFailure={error => {
            console.log(error)
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
          }}
          // うごかない？
          selectable={true}
          select={info => {
            alert(info)
          }}
          eventClick={props.eventClick}
          eventBorderColor="#33aa99"
          eventBackgroundColor="#33aa99"
          contentHeight={'calc(100vh - 200px)'}
          // aspectRatio={1.5} // 変化がない・・・
        />
      </Box>
    </>
  )
}

export default Home
