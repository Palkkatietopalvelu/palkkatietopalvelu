// ./instructions (ohjeet, Admin)
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

const InstructionsAdmin = () => {
  const user = useSelector(({ user }) => user)
  const parts = {part: ['Lisää asiakas', 'Muuta asiakkaan tietoja', 'Asiakkaan deaktivointi ja asiakkaan poisto', 'Muistutukset', 'Aineistot', 'Salasanan vaihto']}

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 && <div> <hr />
      <br /><Header headline={parts.part[0]} />
      <br /><p>
        Navigointipalkissa valitse asiakkaat ja sieltä lisää uusi. Syötä asiakkaan tiedot, ohjelma ilmoittaa jos joku tieto ei ole hyväksytty. 
        Esim. jos puhelinnumero ei ole oikeassa muodossa. Kun olet painanut lisää, asiakkaalle lähetetään viesti ilmoitettuun spostiin, 
        josta he voivat asettaa oman salasanan ja tulevaisuudessa kirjautua sisään palveluun.
        </p>
      <br /><Header headline={parts.part[1]} />   
      <br /><p>
        Navigointipalkissa valitse joko koti tai omat sivut. Valitse asiakkaista se yritys, jonka tietoja haluat muokata. 
        Avautuneelta sivulta paina "Muuta asiakkaan tietoja" -nappia. Muuta halutut tiedot ja paina "Tallenna tiedot". 
        Jos sähköposti on muutettu, asiakkaalle lähetetään viesti uuteen osoitteeseen, josta he saavat uudet käyttäjätunnukset. 
        </p> 
      <br /><Header headline={parts.part[2]} />
      <br /><p>
        Asiakkaan voi deaktivoida, "Muuta asiakkaan tietoja" -sivulta painamalla "Deaktivoi asiakas". Tämä tarkoittaa että asiakkaan käyttäjätunnus jäädytetään,
        mutta muita tietoja säilytetään ohjelmassa.
      </p>
      <br /><p>
        Samalta sivulta asiakkaan voi poistaa, painamalla "Poista asiakas". Jos asiakas poistetaan, kaikki yrityksen tiedot poistuvat ohjelmasta.
      </p>
      <br /><Header headline={parts.part[3]} />
      <br /><p>
      Voit asettaa joko automaattiset muistutukset tai lähettää muistutuksia manuaalisesti. 
      </p>
      <br /><h6>
        Automaattiset muistutukset
      </h6>
      <br /><p>
      Valitse navigointipalkista "Muistutukset" ja sieltä "Automaattiset Muistutukset". Painamalla "Muokkaa" voit asettaa haluamasi asetukset 
      automaattisille muistutuksille. Muista valita muistutuspäivä ja lähetystapa (sähköposti tai tekstiviesti). Muistutusviestin sisältöä voit muokata 
      haluamaasi muotoon (kuitenkin max 160 merkkiä). Muista painaa kytkin vihreäksi ja painaa "Tallenna". Automaattiset muistutukset menevät kaikille asiakkaille.
      </p>
      <br /><h6>
        Manuaaliset muistutukset
      </h6>
      <br /><p>
      Valitse navigointipalkista "Muistutukset" ja sieltä "Manuaaliset Muistutukset". Valitse yrityksen kohdalta, jolle haluat lähettää muistutukset, haluttu lähetystapa. 
      Halutessasi muokkaa muistutusviestin sisältöä (kuitenkin max 160 merkkiä). Painamalla "Lähetä", valituille yrityksille lähetetään valitulla lähetystavalla heti muistutus.
      </p>
      <br /><Header headline={parts.part[4]} />
      <br /><p>
      Valitse navigointipalkista "Aineistot". Sivulla näkee kaikki saapuneet aineistot. Paina sen yrityksen nimeä, jonka aineistoa haluat tarkastaa. 
      Avautuneella sivulla näkee asiakkaan tiedot. Sivun lopussa on ladatut tiedostot kohta, josta aineiston voi ladata omalle koneelle. 
      Aineston voi siirtää roskakoriin poista napista. Roskakori poistaa yhden viikon vanhat tiedostot automaattisesti. Roskakorista voi myös manuaalisesti poistaa tiedoston kokonaan.
      </p>
      <br /><Header headline={parts.part[5]} />
      <br /><p>
      Omilla sivuilla voit vaihtaa salasanan, painamalla "Vaihda salasana."
      </p>
      </div>}
    </div>
  )
}

export default InstructionsAdmin
