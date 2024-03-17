import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { logoutUser } from '../reducers/userReducer'
import { useState } from 'react'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const [linkColor, setLinkColor] = useState('white')
  const [dropdownColor, setDropdownColor] = useState('white')

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
      paddingTop: user && user.role === 1 ? 8 : 0,
      fontWeight: 'bold',
      textDecoration: isActive ? 'underline' : 'none',
      color: isActive ? 'black' : 'white',
    }
  }

  const dropdownStyle = {
    paddingLeft: 30,
    paddingRight: 8,
    paddingTop: user && user.role === 1 ? 7 : 0,
    color: dropdownColor,
  }

  const logoutLinkStyle = {
    paddingLeft: 30,
    paddingRight: 8,
    paddingTop: user && user.role === 1 ? 8 : 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  }

  const handleMouseOver = (event) => {
    event.persist()
    setLinkColor(event.target.style.color)
    event.target.style.color = 'purple'
  }

  const handleMouseOut = (event) => {
    event.persist()
    event.target.style.color = linkColor
  }

  const handleActiveLinkChange = (event) => {
    event.persist()
    setLinkColor('black')
  }

  // <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/client">LISÄÄ ASIAKAS</NavLink>

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={navbar}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {user ? <span>
              {user.role === 1 && <span>
                <div className="d-flex" style={{ fontWeight: 'b' }}>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/">KOTI</NavLink>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/mypage">OMAT SIVUT</NavLink>
                  <Dropdown id="Dropdown_Asiakkaat" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <Dropdown.Toggle style={dropdownStyle} variant={navbar}><b>ASIAKKAAT</b></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item id="Lisää uusi" href="/client">Lisää uusi</Dropdown.Item>
                      <Dropdown.Item href="#">Omat</Dropdown.Item>
                      <Dropdown.Item href="#">Kaikki</Dropdown.Item>
                      <Dropdown.Item href="#">Aktiiviset</Dropdown.Item>
                      <Dropdown.Item href="#">Deaktivoidut</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/reminders">MUISTUTUKSET</NavLink>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/remindersettings">MUISTUTUSASETUKSET</NavLink>
                  <NavLink style={logoutLinkStyle} onClick={handleLogout} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>KIRJAUDU ULOS</NavLink>
                </div>
              </span>}
              {user.role === 2 && <span>
                <div className="d-flex" style={{ fontWeight: 'b' }}>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/">KOTI</NavLink>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/mypage">OMAT SIVUT</NavLink>
                  <NavLink style={logoutLinkStyle} onClick={handleLogout} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>KIRJAUDU ULOS</NavLink>
                </div>
              </span>}
            </span>
              :<span>
                <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/login" id='login'>KIRJAUDU SISÄÄN</NavLink>
                <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/register" id='register'>REKISTERÖIDY</NavLink>
              </span>}
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