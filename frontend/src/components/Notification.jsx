import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(({ notification }) => notification)

  if (!message.content) {
    return
  }

  return (
    <div>
      <Alert variant={'success'}>{message.content}</Alert>
    </div>
  )
}

export default Notification
