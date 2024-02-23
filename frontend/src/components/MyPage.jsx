import { useSelector } from 'react-redux'
import PasswordChange from './PasswordForm'
import Notification from './Notification'
import MyPageAdmin from './MyPageAdmin'

const MyPage = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <Notification />
      <PasswordChange />
      <hr />
      <MyPageAdmin clients={clients} />
    </div>
  )
}

export default MyPage
