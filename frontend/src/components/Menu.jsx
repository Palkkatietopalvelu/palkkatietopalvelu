import { Link } from 'react-router-dom'
import storageService from '../services/storage'
import { useEffect, useState } from 'react'

const Menu = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const online = storageService.loadUser()
    setUser(online)
  })

  const handleLogout = async (event) => {
    event.preventDefault()
    storageService.removeUser()
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