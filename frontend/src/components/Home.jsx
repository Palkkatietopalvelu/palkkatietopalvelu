import { useEffect, useState } from 'react'
import storageService from '../services/storage'

const Home = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const online = storageService.loadUser()
    setUser(online)
  }, [])


  return (
    <div>
      {user && <div>
        <div>
          <h2>Home page</h2>
        </div>
      </div>}
    </div>
  )
}

export default Home