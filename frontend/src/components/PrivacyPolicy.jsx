// Tietosuojaseloste
import { useSelector } from 'react-redux'
import Notification from './Notification'

const Header = (props) => {
    return (
      <div>
        <h4>
          {props.headline}
          </h4>
      </div>
    )
  }

const SubHeader = (props) => {
    return (
      <div>
        <h5>
          {props.headline}
          </h5>
      </div>
    )
  } 

const PrivacyPolicy = () => {
  const mainHeading = ['Miksi tietosuojaseloste ja mitä ovat henkilötiedot?',
                        'Henkilötietojen käsittelijä vai rekisterinpitäjä',
                        'Mitä tarkoitusta varten käsittelemme henkilötietoja',
                        'Mitä tietoja käsittelemme ja mistä saamme tiedot?',
                        'Millä perusteella käsittelemme henkilötietoja',
                        'Luovutammeko henkilötietoja kolmansille osapuolille',
                        'Kuka käsittelee henkilöteitojasi',
                        'Käsitelläänkö tietoja EU:n tai ETA:n ulkopuolella?',
                        'Mitä teemme suojataksemme henkilötietojasi?',
                        'Miten käytämme evästeitä',
                        'Kuinka kauan säilytämme tietojasi?',
                        'Miten voit käyttää tietosuojalainsäädännön mukaisia oikeuksia?',
                        'Muutokset tähän selosteeseen',
                        'Kuka on rekisterinpitäjä ja mihin voin ottaa yhteyttä?']
  const subHeading = ['Palveluiden tarjoaminen ja tuottaminen',
                        'Asiakassuhteen hoitaminen ja viestiminen',
                        'Myynti ja markkinointi',
                        'Palveluiden ja toiminnan kehittäminen',
                        'Reilu Hallinto henkilötietojen käsittelijänä',
                        'Henkilöltä itseltään saadut tiedot']

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Tietosuojaseloste</h2>
      <Notification />
      <div>
      <br /><Header headline={mainHeading[0]} />
      <br /><Header headline={mainHeading[1]} />
      <br /><Header headline={mainHeading[2]} />
      <br /><SubHeader headline={subHeading[0]} />
      <br /><SubHeader headline={subHeading[1]} />
      <br /><SubHeader headline={subHeading[2]} />
      <br /><SubHeader headline={subHeading[3]} />
      <br /><Header headline={mainHeading[3]} />
      <br /><SubHeader headline={subHeading[4]} />
      <br /><SubHeader headline={subHeading[5]} />
      <br /><Header headline={mainHeading[4]} />
      <br /><Header headline={mainHeading[5]} />
      <br /><Header headline={mainHeading[6]} />
      <br /><Header headline={mainHeading[7]} />
      <br /><Header headline={mainHeading[8]} />
      <br /><Header headline={mainHeading[9]} />
      <br /><Header headline={mainHeading[10]} />
      <br /><Header headline={mainHeading[11]} />
      <br /><Header headline={mainHeading[12]} />
      <br /><Header headline={mainHeading[13]} />
      </div>
    </div>
  )
}

export default PrivacyPolicy