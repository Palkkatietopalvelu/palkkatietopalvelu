import { useEffect, useState } from 'react'
import clientsService from '../services/clients'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const ClientsList = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    clientsService.get().then(clients => {
      setClients(clients)
    })
  }, [])

  return (
    <div>
      <h1>All clients:</h1>
      <div>
        {clients.map((client) => (
          <div key={client.id}>
            <Link to={`client/${client.id}`}>
              {client.company}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ClientsList
