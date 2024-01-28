import { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [data, setData] = useState([])

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