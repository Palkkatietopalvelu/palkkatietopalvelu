import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { create, getAll }
