import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector(({ user }) => user)

  return (
    <div>
      {user && <div>
        <div>
          <h2>Kotinäkymä</h2>
        </div>
      </div>}
    </div>
  )
}

export default Home