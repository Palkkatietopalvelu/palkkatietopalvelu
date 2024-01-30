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
        <h2>Log in</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username' {...username} />
          </div>
          <div>
          password
            <input id='password' {...password} />
          </div>
          <button id="login" type="submit">login</button>
        </form>
      </div>}
    </div>
  )
}

export default LoginForm
