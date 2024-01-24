import clientService from '../services/client'
import { useState } from 'react'

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

const AddClient = () => {
  const [newCompany, setNewCompany] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhonenumber, setNewPhonenumber] = useState('')
  const [newBiCode, setNewBiCode] = useState('')
  const [newDeadline, setNewDeadline] = useState('')
  const [newPayperiod, setNewPayperiod] = useState('')

  const handleCompanyChange = (event) => {
    setNewCompany(event.target.value)
  }

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value)
  }

  const handlePhonenumberChange = (event) => {
    setNewPhonenumber(event.target.value)
  }

  const handleBiCodeChange = (event) => {
    setNewBiCode(event.target.value)
  }

  const handleDeadlineChange = (event) => {
    setNewDeadline(event.target.value)
  }

  const handlePayperiodChange = (event) => {
    setNewPayperiod(event.target.value)
  }

  const handleAddClient = async (event) => {
    event.preventDefault()
    try {
      const newClient = {
        company: newCompany,
        email: newEmail,
        phonenumber: newPhonenumber,
        bi_code: newBiCode,
        deadline: newDeadline,
        payperiod: newPayperiod
      }

      if (!isValidDate(newDeadline)) {
        console.log('Päivämäärä ei ole oikeassa muodossa (yyyy-mm-dd)')
      }
      else if (!isValidBicode(newBiCode)){
        console.log('Y-tunnus ei ole oikeassa muodossa')
      }
      else {
        await clientService.add(newClient)
        setNewCompany('')
        setNewEmail('')
        setNewPhonenumber('')
        setNewBiCode('')
        setNewDeadline('')
        setNewPayperiod('')
      }
    } catch (exeption) {
      console.log('ei toiminut')
    }
  }
  return (<form onSubmit={handleAddClient}>
    <label>
          Yritys: <input name="companyInput" value={newCompany} onChange={handleCompanyChange} />
    </label>
    <br/>
    <label>
          Sähköposti: <input name="emailInput" value={newEmail} type="email" onChange={handleEmailChange} />
    </label>
    <br/>
    <label>
          Puhelinnumero: <input name="phonenumberInput" value={newPhonenumber} onChange={handlePhonenumberChange} />
    </label>
    <br/>
    <label>
          Y-tunnus: <input name="bicodeInput" value={newBiCode} placeholder="1234567-8" onChange={handleBiCodeChange} />
    </label>
    <br/>
    <label>
          Eräpäivä: <input name="deadlineInput" value={newDeadline} placeholder="yyyy-mm-dd" onChange={handleDeadlineChange} />
    </label>
    <br/>
    <label>
          Palkkakausi: <input name="payperiodInput" value={newPayperiod} onChange={handlePayperiodChange} />
    </label>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>)
}

export default AddClient
