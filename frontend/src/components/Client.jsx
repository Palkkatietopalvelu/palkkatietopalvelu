import { useEffect, useState } from 'react'
import clientService from '../services/client'
import { useParams } from 'react-router-dom'

const Client = () => {
  const params = useParams()
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [biCode, setBiCode] = useState('')
  const [deadline, setDeadline] = useState('')
  const [payperiod, setPayperiod] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await clientService.get(params.id)
        console.log(data)
        setCompany(data.company)
        setEmail(data.email)
        setPhonenumber(data.phonenumber)
        setBiCode(data.bi_code)
        setDeadline(data.deadline)
        setPayperiod(data.payperiod)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [params.id])

  return (
    <div>
      <h1>{company}</h1>
      <h4>Yhteystiedot</h4>
      <p>Sähköposti: {email}</p>
      <p>Puhelinnumero: {phonenumber}</p>
      <h4>Laskutustiedot</h4>
      <p>Y-tunnus: {biCode}</p>
      <p>Eräpäivä: {deadline}</p>
      <p>Palkkakausi: {payperiod}</p>
    </div>
  )
}

export default Client
