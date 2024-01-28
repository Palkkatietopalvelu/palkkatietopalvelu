import { Link } from 'react-router-dom'
import storageService from '../services/storage'

const Menu = ({ user }) => {
  const handleLogout = async (event) => {
    event.preventDefault()
    storageService.removeUser()
    window.location.reload()
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      {user ?
        <span>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} onClick={handleLogout}>logout</Link>
          <i>{user.username} logged in&nbsp;</i></span>
        :<span>
          <Link style={padding} to="/login">login</Link>
          <Link style={padding} to="/register">register</Link>
        </span>
      }
    </div>
  )
}

export default Menu