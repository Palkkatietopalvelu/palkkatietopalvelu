import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.value,
      password: password.value })).then(result => {
      if (result) {
        navigate('/')
      }
    })
  }

  return (
    <div>
      {!user && <div>
        <h2>Kirjaudu sisään</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input id='username' {...username} />
          </div>
          <div>
          salasana
            <input id='password' {...password} />
          </div>
          <button id="login" type="submit">kirjaudu</button>
        </form>
      </div>}
    </div>
  )
}

export default LoginForm
