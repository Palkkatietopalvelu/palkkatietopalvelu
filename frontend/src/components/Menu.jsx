import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
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

  const navbar = {
    backgroundColor: 'rgb(13, 177, 13)'
  }

  const navLinkStyles = ({ isActive }) => {
    return {
      paddingLeft: 30,
      paddingRight: 8,
      fontWeight: 'bold',
      textDecoration: isActive ? 'underline' : 'none',
      color: isActive ? 'rgb(160, 32, 240)' : 'white'
    }
  }

  const padding = {
    paddingLeft: 30,
    paddingRight: 8,
    fontSize: 16,
    color: 'white',
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={navbar}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? <span>
              <NavLink style={navLinkStyles} to="/">KOTI</NavLink>
              <NavLink style={navLinkStyles} to="/mypage">OMAT SIVUT</NavLink>
              {user.role === 1 && <span>
                <NavLink style={navLinkStyles} to="/client">LISÄÄ ASIAKAS</NavLink>
                <NavLink style={navLinkStyles} to="/reminders">MUISTUTUKSET</NavLink>
                <NavLink style={navLinkStyles} to="/remindersettings">MUISTUTUSASETUKSET</NavLink>
              </span>}
              <NavLink style={padding} onClick={handleLogout} className="text-decoration-none"><b>KIRJAUDU ULOS</b></NavLink>
            </span>
              :<span>
                <NavLink style={navLinkStyles} to="/login" id='login'>KIRJAUDU SISÄÄN</NavLink>
                <NavLink style={navLinkStyles} to="/register" id='register'>REKISTERÖIDY</NavLink></span>}
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