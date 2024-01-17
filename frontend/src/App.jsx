import { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/data')
      const result = await response.json()
      console.log(result)
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Backend Data:</h1>
        {data.map(info => info.name)}
    </div>
  )
}

export default App