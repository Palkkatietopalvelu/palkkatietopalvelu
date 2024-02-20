import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    navigate('/')
  }

  const padding = {
    paddingLeft: 20,
    paddingRight: 5,
    color: 'blue'
  }
  const navbar = {
    backgroundColor: 'rgb(0, 230, 0)'
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={navbar}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? <span>
              <Link style={padding} to="/">koti</Link>
              <Link style={padding} to="/mypage">omat sivut</Link>
              <Link style={padding} to="/client">lisää asiakas</Link>
              <Link style={padding} to="/reminders">muistutukset</Link>
              <Link style={padding} to="/remindersettings">muistutusasetukset</Link>
              <Link style={padding} onClick={handleLogout}>kirjaudu ulos</Link>
            </span>
              :<span>
                <Link style={padding} to="/login" id='login'>kirjaudu sisään</Link>
                <Link style={padding} to="/register" id='register'>rekisteröidy</Link></span>}
          </Nav>
        </Navbar.Collapse>
        <div className="logo-container">
          <img
            src={'../assets/Reilu_logo_white.png'}
            id='reilu-logo'
            className="logo img-fluid"
            alt="Logo"
            width="180" height="180"
          />
        </div>
      </Navbar>
    </div>
  )
}

export default Menu