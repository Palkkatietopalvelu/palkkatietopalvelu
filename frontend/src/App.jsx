import { useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logoutUser } from './reducers/userReducer'
import { getClients } from './reducers/clientsReducer'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import ClientDataChangeForm from './components/ClientUpdateForm'
import ClientReminder from './components/Mail'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(getUser())
      .then(user => {
        if (user) {
          dispatch(getClients())
        }
      })
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    //navigate('/')
  }

  const padding = {
    padding: 3
  }

  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                {user ? <Link style={padding} to="/">koti</Link> : ''}
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? <Link style={padding} to="/client">lisää asiakas</Link> : ''}
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? <Link style={padding} to="/reminders">muistutukset</Link> : ''}
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user
                  ? <Link style={padding} onClick={handleLogout}>kirjaudu ulos</Link>
                  : <Link style={padding} to="/login">kirjaudu sisään</Link>
                }
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? '' : <Link style={padding} to="/register">rekisteröidy</Link>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<ClientsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/client" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client/:id/changedata" element={<ClientDataChangeForm />} />
          <Route path="/reminders" element={<ClientReminder />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App