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
  const id = Number(clientObject.id)
  console.log('client.js update clientObject: ', clientObject.id, id)
  const response = await axios.post(`${baseUrl}/${id}`, clientObject, { headers: storage.setHeaders() })
  console.log('response ok:', response)
  return response.data
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

export default { add, get, update, remove }
