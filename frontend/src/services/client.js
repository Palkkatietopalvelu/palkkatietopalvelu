import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/add'

const add = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { add, get }
