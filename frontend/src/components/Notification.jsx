import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification }) => notification)

  if (!message.content) {
    return
  }

  return (
    <div>
      {message.content}
    </div>
  )
}

export default Notification
