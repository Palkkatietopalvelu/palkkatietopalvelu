import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const messages = useSelector(({ notification }) => notification)

  if (messages.length === 0) {
    return
  }

  const lastTwoMessages = messages.slice(-2)

  return (
    <div>
      {lastTwoMessages.map((msg, index) => (
        <Alert key={index} variant={msg.type}>
          {msg.content}
        </Alert>
      ))}
    </div>
  )
}

export default Notification
