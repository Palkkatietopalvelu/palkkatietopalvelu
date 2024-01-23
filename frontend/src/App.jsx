import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'

const App = () => {
  const padding = {
    paddingRight: 5
  }

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
    <Router>
      <div>
        <Link style={padding} to="/add">add client</Link>
        <Link style={padding} to="/clients">clients</Link>
      </div>
      <Routes>
        <Route path="/home" element={<ClientsList />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/add" element={<ClientForm />} />
        <Route path="/client/:id" element={<Client />} />
      </Routes>
    </Router>
  )
}

export default App
