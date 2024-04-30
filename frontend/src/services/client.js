// hae/muokkaa asiakkaan tietoja; backend/src/controllers/clients.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/client'
import storage from './storage'

// lisää asiakas
const add = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

// hae asiakastietoja
const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
  return response.data
}

// muuta asiakkaan tietoja
const update = async object => {
  const response = await axios.post(`${baseUrl}/${object.id}`, object, { headers: storage.setHeaders() })
  return response.data
}

// poista asiakas
const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

// muuta asiakkaan statusta (aktiivinen, epäaktiivinen)
const status = async object => {
  const response = await axios.post(`${baseUrl}/${object.id}/status`,
    object, { headers: storage.setHeaders() })
  return response.data
}

export default { add, get, update, remove, status }
