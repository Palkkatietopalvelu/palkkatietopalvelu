import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'
import storageService from '../services/storage'
import { notify } from './notificationReducer'
import { getClients } from './clientsReducer'

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  },
})

export const { set, clear } = slice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      dispatch(set(user))
      dispatch(getClients())
      return true
    } catch (e) {
      dispatch(notify('Väärä käyttäjätunnus tai salasana'))
      return false
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(set(user))
    return user
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(clear())
  }
}

export const registerUser = (credentials) => {
  return async dispatch => {
    try {
      await userService.create(credentials)
      dispatch(notify('Käyttäjä luotu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Virhe käyttäjän luonnissa'))
      return false
    }
  }
}

export const changePassword = (data) => {
  return async dispatch => {
    try {
      await userService.update(data)
      dispatch(notify('Salasana vaihdettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Virhe tietojen päivittämisessä'))
      return false
    }
  }
}

export default slice.reducer