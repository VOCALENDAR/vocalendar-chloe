import FullCalendar from '@fullcalendar/react'
import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import integrationPlugIn from '@fullcalendar/interaction'
import './fullcalendar.css'
import { Avatar, Box, Button, Drawer, Paper, Typography } from '@mui/material'
import { MouseEventHandler } from 'react'
import OgImage from '../../_features/ogImage'
import { Event } from '.'

type Props = {
  calendarRef: React.RefObject<FullCalendar>
  goNext: MouseEventHandler<HTMLButtonElement>
  goPrev: MouseEventHandler<HTMLButtonElement>
  goToday: MouseEventHandler<HTMLButtonElement>
  changeView: MouseEventHandler<HTMLButtonElement>
  toggleShowDayEvent: MouseEventHandler<HTMLButtonElement>
  calendarTitle: string
  showEventData?: Event
  setShowEventData: React.Dispatch<React.SetStateAction<Event | undefined>>
} & Required<Pick<CalendarOptions, 'eventSourceSuccess' | 'eventClick' | 'eventSources'>>

/**
 * VOCALENDAR HOMEのView Component
 * @param props
 * @returns
 */
const Home: React.FC<Props> = props => {
  // TODO FullcalendarがAPIを2回発行するのでなんとかしたい
  const drawerWidth = 200

  return (
    <>
      <Box className="vocalendar-main">
        <Button variant="text" startIcon={<Avatar src={'./logo.vocalendar.png'} />}></Button>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.7em', display: 'inline' }}>{props.calendarTitle}</Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: '20%', ml: 2, backgroundColor: '#169D7D' }}
          onClick={props.goToday}
        >
          今日
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: '20% 0 0 20%', ml: 2, backgroundColor: '#169D7D' }}
          onClick={props.goPrev}
        >
          前の月
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: '0 20% 20% 0', ml: 0.5, backgroundColor: '#169D7D' }}
          onClick={props.goNext}
        >
          次の月
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: '20% 0 0 20%', ml: 0.5, backgroundColor: '#79DA77' }}
          onClick={props.changeView}
          value={'dayGridMonth'}
          disabled={true}
        >
          月表示
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#79DA77' }}
          onClick={props.changeView}
          value={'timeGridWeek'}
        >
          週表示
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: '0 20% 20% 0', backgroundColor: '#79DA77' }}
          onClick={props.changeView}
          value={'timeGridDay'}
        >
          日表示
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: '10%', backgroundColor: '#79DA77' }}
          onClick={props.toggleShowDayEvent}
        >
          終日イベントを隠す
        </Button>
        <FullCalendar
          ref={props.calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, integrationPlugIn]}
          initialView="dayGridMonth"
          // customButtons={props.customButtons}
          headerToolbar={{
            left: '',
            center: '',
            right: '',
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
          eventBorderColor="#169D7D"
          eventBackgroundColor="#169D7D"
          contentHeight={'calc(100vh - 200px)'}
          // aspectRatio={1.5} // 変化がない・・・
        />
      </Box>
      <Drawer
        anchor="right"
        open={props.showEventData != undefined}
        onClose={(_event, _reason) => {
          props.setShowEventData(undefined)
        }}
        sx={{ width: `${drawerWidth}px` }}
      >
        {props.showEventData && (
          <Paper sx={{ maxWidth: '600px' }}>
            <OgImage siteURL={'https://piapro.net/miku16thbd/'}></OgImage>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>イベント</Typography>
            </div>
            <div>
              <Typography>{props.showEventData.title}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>場所</Typography>
            </div>
            <div>
              <Typography>{props.showEventData.location}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>日時</Typography>
            </div>
            <div>
              <Typography>{props.showEventData.start}</Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>詳細</Typography>
            </div>
            <div>
              <Typography>{props.showEventData.description}</Typography>
            </div>
          </Paper>
        )}
      </Drawer>
    </>
  )
}

export default Home
