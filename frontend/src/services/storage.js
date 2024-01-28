const KEY = 'loggedAppUser'

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

const setHeaders = () => {
  return { 'Authorization': loadUser() ? `Bearer ${loadUser().token}` : null }
}

export default {
  saveUser, loadUser, removeUser, setHeaders
}