import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const messages = useSelector(({ notification }) => notification)

  if (messages.length === 0) {
    return
  }

  return (
    <div>
      <Alert variant={messages.slice(-1)[0].type}>{messages.slice(-1)[0].content}</Alert>
    </div>
  )
}

export default Notification
