// (Yläpalkki ja valikko)
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap'
import { logoutUser } from '../reducers/userReducer'
import { useState } from 'react'
import NavbarLogo from '../../assets/Reilu_logo_white.png'

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
    maxWidth: '100%',
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

  const infoStyle = {
    paddingRight: 10,
    fontSize: '30px',
    fontWeight: 'bold',
    color:'white',
  }

  const dropdownStyle = {
    paddingLeft: 30,
    paddingRight: 8,
    paddingTop: user && user.role === 1 ? 7 : 0,
    color: dropdownColor,
    border: 0
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

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={navbar}>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {user ? <span className='d-flex flex-sm-row flex-column' style={{ fontWeight: 'b' }}>
                <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/">KOTI</NavLink>
                {user.role === 1 && <span className='d-flex flex-sm-row flex-column' style={{ fontWeight: 'b' }}>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/addclient">LISÄÄ ASIAKAS</NavLink>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/files">AINEISTOT</NavLink>
                  <Dropdown id="Dropdown_Muistutukset" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <Dropdown.Toggle style={dropdownStyle} variant={navbar}><b>MUISTUTUKSET</b></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item id="Automatic" href="/remindersettings">Automaattiset muistutukset</Dropdown.Item>
                      <Dropdown.Item id="Manual" href="/reminders">Manuaaliset muistutukset</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>}
                <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/mypage">OMAT SIVUT</NavLink>
                <NavLink style={logoutLinkStyle} onClick={handleLogout} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id='logout'>KIRJAUDU ULOS</NavLink>
              </span>
                :<span>
                  <NavLink style={navLinkStyles} onClick={handleActiveLinkChange} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/login" id='login'>KIRJAUDU SISÄÄN</NavLink>
                </span>}
            </Nav>
          </Navbar.Collapse>
          <NavLink style={infoStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} to="/instructions"><i className="bi bi-info-circle"></i></NavLink>
          <div className="logo-container">
            <img
              src={NavbarLogo}
              id='reilu-logo'
              className="logo img-fluid"
              alt="Logo"
              width="180" height="180"
            />
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Menu