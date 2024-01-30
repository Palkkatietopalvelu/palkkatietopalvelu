import { useEffect, useState } from 'react'
import storageService from '../services/storage'

const Home = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const online = storageService.loadUser()
    setUser(online)
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/data')
      const result = await response.json()
      setData(result)
    }
    fetchData()
    }, [])

  return (
    <div>
      {user && <div>
      <div>
        <h2>Home page</h2>
        {data.map(info => info.name)}
      </div>
    </div>}
    </div>
  )
}

export default Home