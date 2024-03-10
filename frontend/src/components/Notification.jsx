import { useSelector } from 'react-redux'

const Notification = () => {
  const messages = useSelector(({ notification }) => notification)

  if (messages.length === 0) {
    return
  }

  return (
    <div>
      {messages.slice(-1)[0].content}
    </div>
  )
}

export default Notification
