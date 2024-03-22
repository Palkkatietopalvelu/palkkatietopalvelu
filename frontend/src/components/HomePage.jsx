// ./ (admin ja asiakas)
import { useSelector } from 'react-redux'
import HomeAdmin from './HomeAdmin'
import HomeClient from './HomeClient'

const HomePage = () => {
  const user = useSelector(({ user }) => user)

  if (!user) {
    return
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
