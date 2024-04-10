// ./intsructions (ohjeet, Client)
import { useSelector } from 'react-redux'
import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h4>
          {props.headline}
          </h4>
      </div>
    )
  }  

const InstructionsClient = () => {
  const user = useSelector(({ user }) => user)
  const client = useSelector(({ clients }) => clients).find(c => c.email === user.username)
  const parts = ['Tiedostojen palautus', 'Tiedostojen poisto', 'Salasanan vaihto']

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  return (
    <div>
      {user.role === 2 && <div> <hr />
      <br /><Header headline={parts[0]} />
      <br /><p>
      Kotisivulla voi palauttaa aineistoja. Voit palauttaa joko valmiin tiedoston tai syöttää ohjelmassa olevan lomakkeen kautta jokaisen työntekijän tiedot. 
      Voit myös ladata .csv tiedoston, johon voit täyttää tiedot ja sitten palauttaa sen tiedostona.
      </p>
      <br /><Header headline={parts[1]} />
      <br /><p>
      Kotisivulla voi myös poistaa tiedostoja. Painamalla poista nappia, tiedosto siirtyy roskakoriin. 
      Roskakori poistaa yhden viikon vanhat tiedostot automaattisesti. Roskakorista voi myös manuaalisesti poistaa tiedoston kokonaan.
      </p>
      <br /><Header headline={parts[2]} />
      <br /><p>
      Omilla sivuilla voit vaihtaa salasanan, painamalla "Vaihda salasana."
      </p>
      </div>}
    </div>
  )
}

export default InstructionsClient