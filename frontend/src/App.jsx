import { useEffect, useState } from 'react'
import loginService from './services/login'
import userService from './services/user'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Notification from './Notification'

const App = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (user !== null) {
      const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/data')
        const result = await response.json()
        console.log(result)
        setData(result)
      }
      fetchData()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const newUser = await userService.create({
        username: newUsername,
        password: newPassword,
        role: 1
      })
      setNewUsername('')
      setNewPassword('')
      setNotification('User created successfully')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error creating user'
      setNotification(errorMessage)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(
        'login successful'
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification(
        'wrong username or password'
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedAppUser')
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <h2>Create new user</h2>
        <RegistrationForm
          handleRegistration={handleRegistration}
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        />
        <Notification message={notification} type="error"/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>blogs</h1>
        <Notification message={setNotification}/>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      <div>
        <h1>Backend Data:</h1>
        {data.map(info => info.name)}
      </div>
    </div>
  )
}

export default App
