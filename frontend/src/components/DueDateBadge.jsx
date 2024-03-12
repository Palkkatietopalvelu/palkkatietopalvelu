import { format, formatDistanceToNow, endOfDay, isPast } from 'date-fns'
import Badge from 'react-bootstrap/Badge';

const DueDateBadge = ({ client, now }) => {
  const late = isPast(client.deadlines[0])

  if (late) {
    return (
      <Badge bg="danger" pill>myöhässä</Badge>
    )
  }
  
  let days_left = formatDistanceToNow(client.deadlines[0], now).split(" ")
  if (days_left[0] === "about") 
    days_left = "1 päivä"
  else
    days_left = days_left[0] + " päivää"

  return (
    <Badge bg="primary" pill>{days_left}</Badge>
  )
}

export default DueDateBadge
