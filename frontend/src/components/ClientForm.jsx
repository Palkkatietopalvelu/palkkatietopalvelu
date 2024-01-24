import { useField } from '../hooks/index'
import clientService from '../services/client'

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  return true
}

const isValidBicode = (bicode) => {
  const regex = /^\d{7}-\d{1}$/
  if (!regex.test(bicode)) return false
  return true
}

const ClientForm = () => {
  const company = useField()
  const email = useField()
  const phonenumber = useField()
  const bicode = useField()
  const deadline = useField()
  const payperiod = useField()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newClient = {
        company: company.value,
        email: email.value,
        phonenumber: phonenumber.value,
        bi_code: bicode.value,
        deadline: deadline.value,
        payperiod: payperiod.value
      }
      if (!isValidDate(deadline.value)) {
        console.log('Päivämäärä ei ole oikeassa muodossa (yyyy-mm-dd)')
      } else if (!isValidBicode(bicode.value)) {
        console.log('Y-tunnus ei ole oikeassa muodossa')
      } else {
        await clientService.add(newClient)
        resetFields(event)
      }
    } catch (exception) {
      console.log('ei toiminut')
    }
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
      <form onSubmit={handleSubmit}>
        <label>Yritys: <input {...company} /></label><br/>
        <label>Sähköposti: <input {...email} /></label><br/>
        <label>Puhelinnumero: <input {...phonenumber} /></label><br/>
        <label>Y-tunnus: <input placeholder="1234567-8" {...bicode} /></label><br/>
        <label>Eräpäivä: <input placeholder="yyyy-mm-dd" {...deadline} /></label><br/>
        <label>Palkkakausi: <input {...payperiod} /></label>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm
