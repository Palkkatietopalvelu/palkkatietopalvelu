// ./ (admin ja asiakas)
import { useSelector } from 'react-redux'
import HomeAdmin from './HomeAdmin'
import HomeClient from './HomeClient'
import LoginForm from './LoginForm'
import checkLogin from './CheckLogin'

const HomePage = () => {
  const user = useSelector(({ user }) => user)

  if (!checkLogin()) {
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
