import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ClientsList = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)

  if (!user) {
    return
  }

  return (
    <div>
      <h1>Asiakkaat:</h1>
      <div>
        {clients.map((client) => (
          <div key={client.id}>
            <Link to={`/client/${client.id}`}>
              {client.company}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ClientsList
