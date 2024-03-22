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
      return state.map(client => client.id === payload.id ? payload : client)
    },
    remove(state, { payload }) {
      return state.filter(c => c.id !== payload)
    }
  }
})

export const { set, add, update, remove } = slice.actions

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
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen', 'danger'))
      return false
    }
  }
}

export const updateClient = (client) => {
  return async dispatch => {
    try {
      const data = await clientService.update(client)
      dispatch(update(data))
      dispatch(notify('Asiakkaan tiedot päivitetty onnistuneesti'))
      dispatch(getClients())
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen', 'danger'))
      return false
    }
  }
}

export const deleteClient = (client) => {
  return async dispatch => {
    try {
      await clientService.remove(client.id)
      dispatch(remove(client.id))
      dispatch(notify('Asiakkaan tiedot poistettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen', 'danger'))
      return false
    }
  }
}

export const updateStatus = (client) => {
  return async dispatch => {
    try {
      const data = await clientService.status(client)
      if (!client.status) {
        dispatch(notify('Asiakas deaktivoitu'))
      } else {
        dispatch(notify('Asiakas aktivoitu'))
      }
      dispatch(update(data))
      dispatch(getClients())
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, tarkistathan tiedot uudelleen', 'danger'))
      return false
    }
  }
}

export default slice.reducer