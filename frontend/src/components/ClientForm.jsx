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

const isValidPhonenumber = (phonenumber) => {
  const regex = /^\+\d{1,3}\s\d{8,12}$/
  if (!regex.test(phonenumber)) return false
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
      } else if (!isValidPhonenumber(phonenumber.value)) {
        console.log('Puhelinnumero ei ole oikeassa muodossa (plusmerkki suuntakoodi välilyönti puhelinnumero')
      } else {
        await clientService.add(newClient)
        resetFields(event)
      }
    } catch (exception) {
      console.log('moi',exception)
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
