// Pilleri joka kertoo jäjelläolevan ajan palkkapäivään
import { formatDistanceToNow, isPast, endOfDay } from 'date-fns'
import Badge from 'react-bootstrap/Badge'

const DueDateBadge = ({ deadline }) => {
  const now = endOfDay(new Date())
  const late = isPast(deadline)

  if (!deadline) {
    return
  }

  let days_left = formatDistanceToNow(deadline, now).split(' ')
  if (late) {
    if(days_left[0] === 'about' && days_left[2] ==='hours') {
      days_left = 'tänään'
    }
    else {
      days_left = 'myöhässä'
    }
    return (
      <Badge bg='danger' pill>{days_left}</Badge>
    )
  }

  if (days_left[2] === 'month' || days_left[1] === 'months') {
    days_left = 'yli kuukausi'
  }
  else if (days_left[0] === 'about')
    days_left = '1 päivä'
  else if (days_left[0] === '1' && days_left[1] === 'day') {
    days_left = '2 päivää'
  }
  else {
    let days_left_int = Number(days_left[0]) + 1
    days_left = days_left_int + ' päivää'
  }

  return (
    <Badge bg='primary' pill>{days_left}</Badge>
  )
}

export default DueDateBadge
