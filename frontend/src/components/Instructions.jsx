// instructions (ohjeet) Yleinen ohjesivu
import { useSelector } from 'react-redux'
import Notification from './Notification'
import InstructionsAdmin from './InstructionsAdmin'
import InstructionsClient from './InstructionsClient'
import useCheckLogin from '../hooks/CheckLogin'

const Instructions = () => {
  const user = useSelector(({ user }) => user)

  if (!useCheckLogin()) {
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