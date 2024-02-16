import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/users'
import storage from './storage'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const update = async object => {
  const id = object.user_id
  const response = await axios.post(`${baseUrl}/${id}`, object, { headers: storage.setHeaders() })
  return response.data
}

export default { create, getAll, update }
