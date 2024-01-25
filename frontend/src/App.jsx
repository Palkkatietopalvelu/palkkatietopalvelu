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
