const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const className = type === 'error' ? 'error' : 'success'
  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification
