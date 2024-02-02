import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import { notify } from '../reducers/notificationReducer'
import { addClient } from '../reducers/clientsReducer'
import Notification from './Notification'

const ClientForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const company = useField()
  const email = useField()
  const phonenumber = useField()
  const bicode = useField()
  const deadline = useField()
  const payperiod = useField()

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addClient({
      company: company.value,
      email: email.value,
      phonenumber: phonenumber.value,
      bi_code: bicode.value,
      deadline: deadline.value,
      payperiod: payperiod.value
    })).then(result => {
      if (result) {
        resetFields(event)
      }
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    company.onReset()
    email.onReset()
    phonenumber.onReset()
    bicode.onReset()
    deadline.onReset()
    payperiod.onReset()
  }

  return (
    <div>
      <Notification />
      <form onSubmit={handleSubmit}>
        <label>Yritys: <input {...company} required/></label><br/>
        <label>Sähköposti: <input {...email} required/></label><br/>
        <label>Puhelinnumero: <input placeholder="+358 451234567" {...phonenumber} required/></label><br/>
        <label>Y-tunnus: <input placeholder="1234567-8" {...bicode} required/></label><br/>
        <label>Eräpäivä: <input placeholder="yyyy-mm-dd" {...deadline} required/></label><br/>
        <label>Palkkakausi: <input {...payperiod} required/></label>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm