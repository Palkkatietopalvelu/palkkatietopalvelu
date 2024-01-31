import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import clientService from '../services/client'

const Client = () => {
  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const [client, setClient] = useState({})

  useEffect(() => {
    clientService.get(id).then(data => {
      setClient(data)
    })
  }, [])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <h1>{client.company}</h1>
      <h4>Yhteystiedot</h4>
      <p>Sähköposti: {client.email}</p>
      <p>Puhelinnumero: {client.phonenumber}</p>
      <h4>Laskutustiedot</h4>
      <p>Y-tunnus: {client.bi_code}</p>
      <p>Eräpäivä: {client.deadline}</p>
      <p>Palkkakausi: {client.payperiod}</p>
    </div>
  )
}

export default Client
