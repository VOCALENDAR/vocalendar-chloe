import { Paper, SxProps, Typography } from '@mui/material'
import { Event } from '../../app/types/event'
import extractURL from '../../util/extractURL'
import linkifyText from '../../util/linkifyText'
import OgImage from '../ogImage'

type Props = {
  event: Event
  sx?: SxProps
}

const ShowEventData: React.FC<Props> = ({ event, sx }) => (
  <Paper sx={{ maxWidth: '600px', ...sx }}>
    <OgImage siteURL={extractURL(event.description)}></OgImage>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>{event.title || event.summary}</Typography>
    </div>
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>🏢{event.location}</Typography>
    </div>
    {event.location && (
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
      />
    )}
    <div>
      <Typography sx={{ fontWeight: 'bold' }}>📅{event.start}</Typography>
    </div>
    <div>
      <Typography sx={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
        {/* 改行を反映 */}
        {linkifyText(event.description?.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '') ?? '')}
      </Typography>
    </div>
  </Paper>
)

export default ShowEventData
