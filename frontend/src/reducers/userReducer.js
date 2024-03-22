import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import setpasswordService from '../services/setpassword'
import resetpasswordService from '../services/resetpassword'
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
      dispatch(notify(e.response?.data.error ||
        'Väärä käyttäjätunnus tai salasana', 'danger'))
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
      dispatch(notify(e.response?.data || 'Virhe käyttäjän luonnissa', 'danger'))
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
      dispatch(notify(e.response?.data || 'Virhe tietojen päivittämisessä', 'danger'))
      return false
    }
  }
}

export const resetClientPassword = (email) => {
  return async dispatch => {
    try {
      await resetpasswordService.resetpassword(email)
      dispatch(notify('Sähköposti lähetettiin onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tällä sähköpostilla ei löytynyt tunnuksia', 'danger'))
      return false
    }
  }
}

export const setClientPassword = (data) => {
  return async dispatch => {
    try {
      await setpasswordService.setpassword(data)
      dispatch(notify('Salasana asetettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Virhe salasanan asettamisessa', 'danger'))
      return false
    }
  }
}

export const validateToken = (token) => {
  return async dispatch => {
    try {
      await setpasswordService.get(token)
      return true
    } catch (e) {
      return false
    }
  }
}
export default slice.reducer