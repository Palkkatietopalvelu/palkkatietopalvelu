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
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    color: 'white',
  }
  const navbar = {
    backgroundColor: 'rgb(0, 170, 0)'
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={navbar}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? <span>
              <Link style={padding} to="/" className="text-decoration-none"><b>KOTI</b></Link>
              <Link style={padding} to="/mypage" className="text-decoration-none"><b>OMAT SIVUT</b></Link>
              <Link style={padding} to="/client" className="text-decoration-none"><b>LISÄÄ ASIAKAS</b></Link>
              <Link style={padding} to="/reminders" className="text-decoration-none"><b>MUISTUTUKSET</b></Link>
              <Link style={padding} to="/remindersettings" className="text-decoration-none"><b>MUISTUTUSASETUKSET</b></Link>
              <Link style={padding} onClick={handleLogout} className="text-decoration-none"><b>KIRJAUDU ULOS</b></Link>
            </span>
              :<span>
                <Link style={padding} to="/login" id='login' className="text-decoration-none"><b>KIRJAUDU SISÄÄN</b></Link>
                <Link style={padding} to="/register" id='register' className="text-decoration-none"><b>REKISTERÖIDY</b></Link></span>}
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