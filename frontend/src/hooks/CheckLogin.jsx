import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const useCheckLogin = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  if (!user) {
    return null
  }

  if (user.exp < Date.now()) {
    dispatch(logoutUser())
    return null
  }
  return true
}

export default useCheckLogin