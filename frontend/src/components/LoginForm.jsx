import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import storageService from '../services/storage'
import Notification from './Notification'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      storageService.saveUser(user)
      navigate('/')
      window.location.reload()
    } catch (exception) {
      setNotification(
        exception.response.data.error
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!storageService.loadUser() && <div>
        <h2>Log in</h2>
        <Notification message={notification}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login" type="submit">login</button>
        </form>
      </div>}
    </div>
  )
}

export default LoginForm
