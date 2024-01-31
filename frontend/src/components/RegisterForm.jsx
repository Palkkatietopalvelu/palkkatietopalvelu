import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { registerUser } from '../reducers/userReducer'
import Notification from '../components/Notification'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useField('text')
  const password = useField('password')
  const user = useSelector(({ user }) => user)

  const handleRegistration = async (event) => {
    event.preventDefault()
    dispatch(registerUser({
      username: username.value,
      password: password.value,
      role: 1
    })).then(result => {
      if (result) {
        navigate('/')
      }
    })
  }

  return (
    <div>
      {!user && <div>
        <h2>Luo uusi käyttäjä</h2>
        <Notification />
        <form onSubmit={handleRegistration}>
          <div>
            käyttäjätunnus
            <input id='username' {...username}/>
          </div>
          <div>
            salasana
            <input id='password' {...password} />
          </div>
          <button id='create' type="submit">luo käyttäjä</button>
        </form>
      </div>}
    </div>
  )
}

export default RegisterForm
