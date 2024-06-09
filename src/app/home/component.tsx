import FullCalendar from '@fullcalendar/react';
import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import integrationPlugIn from "@fullcalendar/interaction"
import './fullcalendar.css'
import { Drawer, Paper, Typography } from '@mui/material';
import OgImage from '../../_features/ogImage';

type Props = {
} & Required<Pick<CalendarOptions, 'customButtons' | 'eventSourceSuccess' | 'eventClick' | 'eventSources'>>

/**
 * VOCALENDAR HOMEのView Component
 * @param props 
 * @returns 
 */
const Home: React.FC<Props> = (props) => {

  // TODO FullcalendarがAPIを2回発行するのでなんとかしたい
  return <>
  <div className="vocalendar-main">
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, integrationPlugIn]}
      initialView="dayGridMonth"
      customButtons={props.customButtons}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'customButton dayGridMonth,timeGridWeek,timeGridDay'
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
  <Drawer anchor="right"
        // open={props.isShowEvent}
        open={true}
        // onClose={(event, reason) => { props.setShowEvent(!props.isShowEvent) }}
        // sx={{ width: `${drawerWidth}px` }}
        sx={{minWidth:'1000px'}}
      >
        <Paper>
        <OgImage siteURL={'https://piapro.net/miku16thbd/'}></OgImage>
          <div>
            <Typography sx={{fontWeight:'bold'}}>イベント</Typography>
          </div>
          <div>
            {/* <Typography>{props.showEventData.title}</Typography> */}
            <Typography>うへへへへへへへへへへへへへへ</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>場所</Typography>
          </div>
          <div>
            <Typography>だみー</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>日時</Typography>
          </div>
          <div>
          <Typography>だみー</Typography>
          </div>
          <div>
            <Typography sx={{fontWeight:'bold'}}>詳細</Typography>
          </div>
          <div>
          <Typography>だみー</Typography>
          </div>
        </Paper>

      </Drawer>
  </>

}

export default Home