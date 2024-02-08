import { createSlice } from '@reduxjs/toolkit'

import clientService from '../services/client'
import clientsService from '../services/clients'
import { notify } from './notificationReducer'

const slice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    update(state, { payload }) {
      return state // most likely has to be changed
    }
  }
})

export const { set, add, update } = slice.actions

export const getClients = () => {
  return async dispatch => {
    const clients = await clientsService.get()
    dispatch(set(clients))
  }
}

export const addClient = (client) => {
  return async dispatch => {
    try {
      const data = await clientService.add(client)
      dispatch(add(data))
      dispatch(notify('Asiakas lisätty onnistuneesti'))
      dispatch(getClients())
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen'))
      return false
    }
  }
}

export const updateClient = (clientObject) => {
  console.log("clientsReducer updateClient: ", clientObject)
  return async dispatch => {
    try {
      const data = await clientService.update(clientObject)
      dispatch(update(data))
      dispatch(notify('Asiakkaan tiedot päivitetty onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen'))
      return false
    }
  }
}

export default slice.reducer