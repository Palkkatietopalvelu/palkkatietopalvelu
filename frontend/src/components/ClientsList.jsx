import { useEffect, useState } from 'react'
import clientsService from '../services/clients'

const ClientsList = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await clientsService.get()
        setClients(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>All clients:</h1>
      <div>
        {clients.map((client, index) => (
          <div key={index}>{client}</div>
        ))}
      </div>
    </div>
  )
}

export default ClientsList
