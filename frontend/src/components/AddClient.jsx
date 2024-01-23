import clientService from '../services/client'
import { useState } from 'react'

const AddClient = () => {
  const [newCompany, setNewCompany] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhonenumber, setNewPhonenumber] = useState('')
  const [newBiCode, setNewBiCode] = useState('')
  const [newDeadline, setNewDeadline] = useState('')
  const [newPayperiod, setNewPayperiod] = useState('')
  const [newMaterialId, setNewMaterialId] = useState('')

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

  const handleMaterialIdChange = (event) => {
    setNewMaterialId(event.target.value)
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
        payperiod: newPayperiod,
        material_id: newMaterialId
      }
      console.log(newClient)
      await clientService.add(newClient)
      setNewCompany('')
      setNewEmail('')
      setNewPhonenumber('')
      setNewBiCode('')
      setNewDeadline('')
      setNewPayperiod('')
      setNewMaterialId('')
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
          Sähköposti: <input name="emailInput" value={newEmail} onChange={handleEmailChange} />
    </label>
    <br/>
    <label>
          Puhelinnumero: <input name="phonenumberInput" value={newPhonenumber} onChange={handlePhonenumberChange} />
    </label>
    <br/>
    <label>
          Y-tunnus: <input name="bicodeInput" value={newBiCode} onChange={handleBiCodeChange} />
    </label>
    <br/>
    <label>
          Eräpäivä: <input name="deadlineInput" value={newDeadline} onChange={handleDeadlineChange} />
    </label>
    <br/>
    <label>
          Palkkakausi: <input name="payperiodInput" value={newPayperiod} onChange={handlePayperiodChange} />
    </label>
    <br/>
    <label>
          Palkkatietojen tunnus: <input name="materialidInput" value={newMaterialId} onChange={handleMaterialIdChange} />
    </label>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>)
}

export default AddClient
