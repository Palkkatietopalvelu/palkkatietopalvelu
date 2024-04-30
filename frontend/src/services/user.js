// käyttäjien tietojen hakeminen ja muokkaus; backend/src/controllers/users.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/users'
import storage from './storage'

// hae käyttäjien tiedot
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// luo uusi tilitoimistokäyttäjä
const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

// vaihda käyttäjän salasana (muistat nykyisen)
const update = async object => {
  const id = object.user_id
  const response = await axios.post(`${baseUrl}/${id}`, object, { headers: storage.setHeaders() })
  return response.data
}

export default { create, getAll, update }
