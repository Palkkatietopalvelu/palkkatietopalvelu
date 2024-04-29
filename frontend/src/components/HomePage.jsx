// ./ (admin ja asiakas) Yleinen etusivu.
import { useSelector } from 'react-redux'
import HomeAdmin from './HomeAdmin'
import HomeClient from './HomeClient'
import LoginForm from './LoginForm'
import useCheckLogin from '../hooks/CheckLogin'

const HomePage = () => {
  const user = useSelector(({ user }) => user)

  if (!useCheckLogin()) {
    return <LoginForm />
  }

  return (
    <div>
      {user.role === 1
        ? <HomeAdmin />
        : <HomeClient />}
    </div>
  )
}
export default HomePage
