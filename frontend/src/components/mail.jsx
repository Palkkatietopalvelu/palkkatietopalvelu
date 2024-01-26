import { useField } from '../hooks/index'
import mailService from '../services/mail'

const Mail = () => {
  const recipient = useField()
  const message = useField()

  const handleSubmit = async (event) => {
    event.preventDefault()
    {
      const newMessage = {
        recipient: recipient.value,
        message: message.value
      }
      await mailService.add(newMessage)
    }
  }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Vastaanottaja: <input {...recipient} /></label><br/>
          <label>Viesti: <input {...message} /></label>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
  }
  
  export default Mail