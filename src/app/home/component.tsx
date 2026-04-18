import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import integrationPlugIn from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Avatar, Box, Button, Drawer, Stack, Typography } from '@mui/material'
import { MouseEventHandler, useState } from 'react'
import SearchBox from '../../_features/searchBox'
import SearchList from '../../_features/searchList'
import ShowEventData from '../../_features/showEventData'
import { useSearchListSelectedContext } from '../../_provider/searchListSelectedContext'
import { SearchTextProvider } from '../../_provider/searchTextContext'
import { Event } from '../types/event'
import './fullcalendar.css'

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
  const drawerWidth = '200px'
  const [isOpenSearchDialog, setOpenSearchDialog] = useState(false)
  const [isHideAllDays, setHideAllDays] = useState(false)
  return (
    <>
      <Box className="vocalendar-main">
        <Button variant="text" startIcon={<Avatar src={'./logo.vocalendar.png'} />}></Button>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.7em', display: 'inline', verticalAlign: '-6px' }}>
          {props.calendarTitle}
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20%',
            ml: 2,
            backgroundColor: '#169D7D',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.goToday}
        >
          今日
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20% 0 0 20%',
            ml: 2,
            backgroundColor: '#169D7D',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.goPrev}
        >
          前の
          {(() => {
            const type = props.calendarRef.current?.getApi()?.view.type
            return type == 'dayGridMonth' ? '月' : type == 'timeGridWeek' ? '週' : '日'
          })()}
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '0 20% 20% 0',
            ml: 0.5,
            backgroundColor: '#169D7D',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.goNext}
        >
          次の
          {(() => {
            const type = props.calendarRef.current?.getApi()?.view.type
            return type == 'dayGridMonth' ? '月' : type == 'timeGridWeek' ? '週' : '日'
          })()}
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '20% 0 0 20%',
            ml: 0.5,
            backgroundColor: '#79DA77',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.changeView}
          value={'dayGridMonth'}
          disabled={props.calendarRef.current?.getApi()?.view.type === 'dayGridMonth'}
        >
          月表示
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#79DA77',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.changeView}
          value={'timeGridWeek'}
          disabled={props.calendarRef.current?.getApi()?.view.type === 'timeGridWeek'}
        >
          週表示
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '0 20% 20% 0',
            backgroundColor: '#79DA77',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={props.changeView}
          value={'timeGridDay'}
          disabled={props.calendarRef.current?.getApi()?.view.type === 'timeGridDay'}
        >
          日表示
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: '10%',
            backgroundColor: '#79DA77',
            '&:active': {
              boxShadow: 0, // 影を消す
              transform: 'translateY(2px)', // 2px下にずらす
            },
          }}
          onClick={event => {
            props.toggleShowDayEvent(event)
            setHideAllDays(!isHideAllDays)
          }}
        >
          {isHideAllDays ? '終日イベントを表示' : '終日イベントを隠す'}
        </Button>
        <Button
          variant="text"
          startIcon={<Avatar src={'./button.search.png'} />}
          onClick={() => setOpenSearchDialog(true)}
        ></Button>
        {/* 検索結果一覧 */}
        <Drawer
          anchor="right"
          open={isOpenSearchDialog}
          onClose={() => {
            setOpenSearchDialog(false)
          }}
          sx={{
            width: `${drawerWidth}px`,
          }}
        >
          <SearchTextProvider>
            <Stack direction={'row'} sx={{ overflow: 'hidden' }}>
              <Stack direction={'column'} spacing={2}>
                <SearchBox inputProps={{ sx: { fontSize: '1.5em', height: '2em', mr: -1, pl: '15px' } }} />
                <SearchList />
              </Stack>
              {useSearchListSelectedContext().selectedEvent && (
                <ShowEventData
                  event={useSearchListSelectedContext().selectedEvent!}
                  sx={{ overflow: 'auto', maxHeight: '100vh' }}
                />
              )}
            </Stack>
          </SearchTextProvider>
        </Drawer>
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
          fixedWeekCount={false} // 必ず6週表示するかどうか
          dayMaxEventRows={5} // 1日にいくつイベント表示するか。contentHeight と一緒に計算する必要あり
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
          contentHeight={'calc(100vh - 110px)'}
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
        {props.showEventData && <ShowEventData event={props.showEventData} />}
      </Drawer>
    </>
  )
}

export default Home
