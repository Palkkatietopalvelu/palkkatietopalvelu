import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
    paddingRight: 5
  }

  return (
    <div>
      {user ?
        <span>
          <Link style={padding} to="/">koti</Link>
          <Link style={padding} to="/clients">asiakkaat</Link>
          <Link style={padding} to="/client">lisää asiakas</Link>
          <Link style={padding} onClick={handleLogout}>kirjaudu ulos</Link>
          <i>{user.username} kirjautunut sisään&nbsp;</i></span>
        :<span>
          <Link style={padding} to="/login">kirjaudu sisään</Link>
          <Link style={padding} to="/register">rekisteröidy</Link>
        </span>
      }
    </div>
  )
}

export default Menu