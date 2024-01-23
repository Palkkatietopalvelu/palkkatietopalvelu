import { useEffect, useState } from 'react'
import loginService from './services/login'
import userService from './services/user'

const BadNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const GoodNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setSuccessMessage('User created successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Error creating user')
      setTimeout(() => {
        setErrorMessage(null)
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
      setSuccessMessage(
        'login successful'
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(
        'wrong username or password'
      )
      setTimeout(() => {
        setErrorMessage(null)
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
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login" type="submit">login</button>
        </form>
        <h2>Create new user</h2>
        <form onSubmit={handleRegistration}>
          <div>
            username
            <input
              type="text"
              value={newUsername}
              name="NewUsername"
              onChange={({ target }) => setNewUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={newPassword}
              name="NewPassword"
              onChange={({ target }) => setNewPassword(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <BadNotification message={errorMessage}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>blogs</h1>
        <GoodNotification message={successMessage}/>
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
