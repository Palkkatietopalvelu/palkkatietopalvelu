// instructions (ohjeet)
import { useSelector } from 'react-redux'
import Notification from './Notification'
import InstructionsAdmin from './InstructionsAdmin'
import InstructionsClient from './InstructionsClient'

const Instructions = () => {
  const user = useSelector(({ user }) => user)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Ohjeet</h2>
      <Notification />
      {user.role === 1
        ? <InstructionsAdmin />
        : <InstructionsClient />}
    </div>
  )
}

export default Instructions