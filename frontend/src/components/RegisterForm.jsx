import { useState } from 'react'
import userService from '../services/user'
import storageService from '../services/storage'
import Notification from '../components/Notification'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      await userService.create({
        username: username,
        password: password,
        role: 1
      })
      setUsername('')
      setPassword('')
      setNotification('User created successfully')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error creating user'
      setNotification(errorMessage)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!storageService.loadUser() && <div>
        <h2>Create a new user</h2>
        <Notification message={notification}/>
        <form onSubmit={handleRegistration}>
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
          <button type="submit">create</button>
        </form>
      </div>}
    </div>
  )
}

export default RegisterForm
