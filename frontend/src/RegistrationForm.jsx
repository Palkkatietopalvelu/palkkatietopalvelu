const RegistrationForm = ({ handleRegistration, newUsername, setNewUsername, newPassword, setNewPassword }) => {
  return (
    <form onSubmit={handleRegistration}>
      <div>
        username
        <input
          type="text"
          value={newUsername}
          name="NewUsername"
          onChange={({ target }) => setNewUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={newPassword}
          name="NewPassword"
          onChange={({ target }) => setNewPassword(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default RegistrationForm
