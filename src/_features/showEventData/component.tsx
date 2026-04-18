import { Paper, SxProps, Typography } from '@mui/material'
import { Event } from '../../app/types/event'
import extractURL from '../../util/extractURL'
import OgImage from '../ogImage'

type Props = {
  event: Event
  sx?: SxProps
}

const ShowEventData: React.FC<Props> = ({ event, sx }) => (
  <Paper sx={{ maxWidth: '600px', ...sx }}>
    <OgImage siteURL={extractURL(event.description)}></OgImage>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>イベント</Typography>
    </div>
    <div>
      <Typography>{event.title || event.summary}</Typography>
    </div>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>場所</Typography>
    </div>
    <div>
      <Typography>{event.location}</Typography>
    </div>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>日時</Typography>
    </div>
    <div>
      <Typography>{event.start}</Typography>
    </div>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>詳細</Typography>
    </div>
    <div>
      <Typography>{event.description}</Typography>
    </div>
  </Paper>
)

export default ShowEventData
