// ./remindersettingsform (Automaattiset muistutukset, asetussivu, lomake)
import { Form, Button } from 'react-bootstrap'
import Switch from 'react-switch'
import CheckBox from './CheckBox'
import Notification from './Notification'

const ReminderFormFields = ({
  user,
  checked,
  handleChange,
  emailinputs,
  setEmailinputs,
  smsinputs,
  setSmsinputs,
  remindertext,
  setRemindertext,
  latetext,
  setLatetext,
  days,
  setDays,
  weekDays,
  hour,
  setHour,
  deltas,
  setDeltas,
  relativeDays,
  deltaList,
  handleSubmit,
}) => {
  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2>Automaattiset muistutukset</h2><hr/>
        <Notification />
        <div className="switch">
          <p>Automaattiset muistutukset <span>{checked ? 'käytössä' : 'pois käytöstä'}</span>.</p>
          <label>
            <Switch
              onChange={handleChange}
              checked={checked}
              className="react-switch"
            />
          </label>
        </div>
        <br /><p>Muistutukset lähetetään</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <CheckBox
              name='email'
              inputs={emailinputs}
              setInputs={setEmailinputs}
              checked={emailinputs}
            />
            {' '}{'Sähköpostilla'}
            <br></br>
            <CheckBox
              name='sms'
              inputs={smsinputs}
              setInputs={setSmsinputs}
              checked={smsinputs}
            />
            {' '}{'Tekstiviestillä'}
            <br></br>
            <Form.Label style={{ marginTop: '20px' }}>Muistutusviestin teksti (Max. 137 merkkiä)</Form.Label>
            <Form.Control
              id='remindertext'
              as="textarea"
              rows={3}
              required={checked}
              value={remindertext}
              maxLength={137}
              onChange={(e) => setRemindertext(e.target.value.slice(0, 137))}
            />
            <span>{`${remindertext ? remindertext.length : 0}/137`}</span>
            <br></br>
            <Form.Label style={{ marginTop: '20px' }}>Myöhästymismuistutuksen teksti (Max. 137 merkkiä)</Form.Label>
            <Form.Control
              id='latetext'
              as="textarea"
              rows={3}
              required={checked}
              value={latetext}
              maxLength={137}
              onChange={(e) => setLatetext(e.target.value.slice(0, 137))}
            />
            <span>{`${latetext ? latetext.length : 0}/137`}</span>
            <br></br>
            <Form.Label style={{ marginTop: '20px' }}>
            Muistutuspäivät
            </Form.Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
              {weekDays.map((day, index) => (
                <div key={`day-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CheckBox
                    name={`day-${index}`}
                    inputs={days}
                    setInputs={setDays}
                    checked={days.includes(`day-${index}`)}
                  />
                  <label htmlFor={`delta-${index}`}>{day}</label>
                </div>
              ))}
            </div>
            <Form.Label style={{ marginTop: '20px' }}>Kellonaika (tasatunti 0-23)</Form.Label>
            <Form.Control
              id='hour'
              required={checked}
              value={hour}
              onChange={(f) => setHour(f.target.value)}
            />
            <Form.Label style={{ marginTop: '20px', marginBottom: '20px' }}>
              Valitse, milloin muistutukset lähetetään suhteessa eräpäivään. Muistutuksia lähetetään
              merkittyinä päivinä siihen asti kunnes eräpäivää vastaava aineisto on merkitty toimitetuksi
              asiakkaan tiedoissa.
            </Form.Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
              <div>Päivää ennen eräpäivää</div>
              {relativeDays.map((day, index) => (
                <div key={`delta-${deltaList[index]}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CheckBox
                    name={`delta-${deltaList[index]}`}
                    inputs={deltas}
                    setInputs={setDeltas}
                    checked={deltas.includes(`delta-${deltaList[index]}`)}
                  />
                  <label htmlFor={`delta-${index}`}>{day}</label>
                </div>
              ))}
              <div>Päivää eräpäivän jälkeen</div>
            </div>
            <Button id={'tallenna'} type="submit" style={{ marginTop: '20px' }}>Tallenna</Button>
          </Form.Group>
        </Form>
      </div>}
    </div>
  )
}

export default ReminderFormFields
