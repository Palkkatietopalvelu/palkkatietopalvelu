import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/client'
import storage from './storage'

const add = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
  return response.data
}

const update = async (clientObject) => {
  console.log('client.js update newObject: ', clientObject)
  const id = Number(clientObject.company_id)
  const response = await axios.put(`${baseUrl}/${id}`, clientObject, { headers: storage.setHeaders() })
  console.log('response ok:', response)
  return response.data
}

export default { add, get, update }
