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
                        'Kuka käsittelee henkilötietojasi',
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
      <br /><p>
      Tässä tietosuojaselosteessa kerrotaan, kuinka Reilu Hallinto Oy käsittelee henkilötietoja EU:n yleisen 
      tietosuoja-asetuksen (2016/679/EU) mukaisesti ollessaan tietojen käsittelijä tai rekisterinpitäjä.
      </p>
      <div>
      <br /><Header headline={mainHeading[0]} />
      <br /><p>
      EU:n yleinen tietosuoja-asetuksen mukaan henkilötietoja käsittelevän yrityksen tai organisaation täytyy informoida 
      henkilötietojen luovuttajalle syy henkilötietojen käsittelyyn ja millä tavoin hänen tietojaan käsitellään. 
      Tietosuojaselosteessa informoidaan tiivistetysti, kuinka henkilötietojen käsittely tapahtuu. 
      </p>
      <p>
      Henkilötietoja ovat kaikki tunnistettuun tai tunnistettavissa olevaan luonnolliseen henkilöön (elossa olevaan ihmiseen) liittyvät tiedot. 
      Henkilötietoja ovat myös erilliset tiedot, jotka yhdistettyinä mahdollistavat tietyn henkilön tunnistamisen. 
      Näitä tietoja ovat esimerkiksi nimi, sähköpostiosoite, IP-osoite tai palkkatiedot. 
      </p>
      <p>
      Y-tunnus on henkilötieto, mikäli on kyse yksityisestä elinkeinonharjoittajasta (toiminimi).
      </p>
      <br /><Header headline={mainHeading[1]} />
      <br /><p>
      Silloin kun Reilu Hallinto ei määrittele, että mihin tarkoituksen ja millä tavalla henkilötietoja käsitellään, 
      emme toimi rekisterinpitäjänä vaan olemme henkilötietojen käsittelijä, jolla on pääsy rekisterinpitäjän henkilötietoihin. 
      Kun asiakas esimerkiksi toimittaa tilitoimistolle työntekijöidensä henkilötietoja palkkojen laskemista ja maksamista varten, 
      asiakas on rekisterinpitäjä, koska se määrittelee henkilötietojen käsittelyn tarkoituksen ja keinot. 
      </p>
      <p>
      Henkilötietojen käsittelijä voi käsitellä henkilötietoja vain rekisterinpitäjän määrittelemiin tarkoituksiin. 
      Käsittelijän velvollisuudet rekisterinpitäjää kohtaan määritellään Reilu Hallinnon ja asiakkaan välisessä toimeksiantosopimuksessa. 
      </p>
      <p>
      Toimimme rekisterin pitäjänä tilanteessa, jossa käsittelemme henkilötietoja omasta puolestamme eli päätämme itse, 
      mitä varten ja miten keräämme henkilötietoja. Esimerkki tällaisesta tilanteesta on se, kun käsittelemme oman henkilökuntamme henkilötietoja.
      </p>
      <br /><Header headline={mainHeading[2]} />
      <br /><SubHeader headline={subHeading[0]} />
      <br /><p>
      Taloushallintopalveluiden yhteydessä henkilötietoja tallennetaan ja käsitellään toimeksiantosopimuksen mukaisesti kirjanpidon ja tilinpäätöksen laatimisessa, 
      palkkojen laskemisessa ja maksamisessa, viranomaisilmoitusten tekemisessä sekä rahanpesulain vaatimusten täyttämiseksi. 
      </p>
      <p>
      Viranomaisilmoituksia ovat esimerkiksi tuloveroilmoitus, osakaslainojen vuosi-ilmoitus, osinkojen vuosi-ilmoitus, työntekijäilmoitus urakoista, 
      TAS- ja TyEL- ilmoitukset, ilmoitukset Kelalle, vakuutusyhtiöille ja työttömyyskassaan sekä mahdolliset jäsenmaksut ja ulosottotilitykset. 
      </p>
      <p>
      Henkilötietoja käsitellään myös palveluissa tai erikseen sovituissa toimeksiannoissa, joissa tehdään erilaisia raportteja, 
      hakemuksia ja selvityksiä asiakkaalle tai tämän puolesta.
      </p>
      <br /><SubHeader headline={subHeading[1]} />
      <br /><p>
      Henkilötietoja voidaan käsitellä, kun vastaamme asiakkailta tulleisiin pyyntöihin ja kysymyksiin. 
      Voimme myös itse laittaa asiakkaille kysymyksiä tai informoida heitä heidän tai Reilu Hallinnon asioihin liittyen.
      </p>
      <br /><SubHeader headline={subHeading[2]} />
      <br /><p>
      Käsittelemme henkilötietoja, kun vastaamme saamiimme tarjouspyyntöihin. 
      Voimme myös itse etsiä yritysten päättäjien yhteystietoja erilaisista julkisista lähteistä, 
      kuten yritys- ja yhteisötietojärjestelmistä, lähestyäksemme heitä ja tarjotaksemme palveluitamme.
      </p>
      <br /><SubHeader headline={subHeading[3]} />
      <br /><p>
      Keräämme esimerkiksi verkkosivuilla erilaista teknistä tietoa ja tilastotietoa, jonka avulla voimme seurata ja analysoida verkkosivujemme kävijöitä. 
      Puhelinpalveluun kertyneen tiedon avulla seuraamme, kuinka paljon puheluita tulee ja miten nopeasti niihin vastataan. 
      Verkkosivuilta, puhelinpalvelusta ja muista lähteistä saatua tietoa hyödynnetään käyttäjäkokemuksen, asiakaspalvelun sekä muun liiketoiminnan suunnittelussa ja kehityksessä.
      </p>
      <br /><Header headline={mainHeading[3]} />
      <br /><p>
      Keräämme ja käsittelemme vain sellaisia henkilötietoja, jotka ovat olennaisia ja tarpeellisia aikaisemmin kuvattujen käyttötarkoitusten kannalta.
      </p>
      <br /><SubHeader headline={subHeading[4]} />
      <br /><p>
      Toimiessamme henkilötietojen käsittelijöinä, tiedot saadaan rekisterin ylläpitäjältä (asiakkaalta) tai rekisteröidyltä itseltään (esimerkiksi asiakkaan työntekijöiltä). 
      Tällöin käsiteltävät tiedot on kuvattu toimeksiantosopimuksessa, rekisterinpitäjän tietosuojaselosteessa tai ohjelmistotoimittajan tietosuojakäytännöissä ja käyttöehdoissa.
      </p>
      <br /><SubHeader headline={subHeading[5]} />
      <br /><p>
      Kun henkilö on meihin yhteydessä puhelimella, sähköpostilla, internetsivujemme yhteydenottolomakkeella tai tapaamme kasvotusten, käsittelemme esimerkiksi yhteystietoja 
      (osoite, sähköpostiosoite, puhelinnumero), henkilötietoja (mm. nimi, henkilötunnus, y-tunnus) sekä asiakassuhteeseen ja yhteydenottoon liittyviä tietoja.
      </p>
      <p>
      <b>Julkisista lähteistä, kuten yritys- ja yhteisötietojärjestelmistä saadut tiedot: </b> 
      kuten esimerkiksi nimi, titteli ja yhteystiedot (puhelinnumero, sähköpostiosoite).
      </p>
      <p>
      <b>Verkko- ja puhelinpalvelumme käytöstä saatavat tiedot: </b>
        verkkopalvelun selaus- ja evästetiedot sekä yhteystiedot (nimi, puhelinnumero).
      </p>
      <br /><Header headline={mainHeading[4]} />
      <br /><p>
      Henkilötietojen käsittely perustuu seuraaviin oikeudellisiin perusteisiin riippuen tietojen käsittelyn luonteesta ja tarkoituksesta:
      </p>
      <ul>
        <li><b> Annettu suostumus:</b> suostumuksen perusteella tehtävä käsittely on aina vapaaehtoista ja voit aina peruuttaa antamasi suostumuksen.</li>
        <li><b>Asiakkaan ja Reilu Hallinnon välinen sopimus:</b> toimeksiantosopimuksen yhteydessä on erikseen määritelty henkilötietojen käsittelystä.</li>
        <li><b>Lakisääteisteiden velvoitteiden toteuttaminen</b></li>
        <li><b>Asianmukainen tarve eli oikeutettu etu: </b> 
        Yrityksen on usein käsiteltävä henkilötietoja voidakseen suorittaa liiketoimintaan liittyviä tehtäviä. 
        Katsotaan siis, että yrityksellä on oikeutus saada hyötyä eli etua asiakkaan henkilötiedoista. Esimerkiksi suoramarkkinointi tai eri lähteistä kerättyjen henkilötietojen 
        yhdistäminen liiketoiminnan kehittämiseksi, voi perustua oikeutettuun etuun.</li>
      </ul>
      <br /><Header headline={mainHeading[5]} />
      <br /><p>
      Luovutamme henkilötietoja viranomaisille voimassa olevan lainsäädännön velvoittamissa rajoissa. Lisäksi luovutamme henkilötietoja rekisterinpitäjän tilintarkastajalle. 
      Muissa tapauksissa emme luovuta henkilötietoja edelleen tai käytä niitä muuhun tarkoitukseen kuin mitä toimeksiantosopimuksessa on määritelty.
      </p>
      <br /><Header headline={mainHeading[6]} />
      <br /><p>
      Henkilötietoja käsittelevät Reilu Hallinnolla vain ne henkilöt, jotka tarvitsevat tietoja työtehtäviensä suorittamiseen.
      Käyttämiemme ohjelmistojen ohjelmantoimittajat ovat osaltaan henkilötietojen käsittelijöitä, jolloin sovelletaan kyseisten palveluntarjoajien tietosuojakäytäntöjä ja käyttöehtoja.
      </p>
      <p><i>Alihankkijoiden käyttö</i></p>
      <p>
      Saatamme käyttää toimeksiantosopimuksen mukaisesti alihankkijoita ja palveluntarjoajia palveluiden tuottamiseen, ylläpitoon ja kehittämiseen. 
      Alihankkijat ja palveluntarjoajat käsittelevät henkilötietoja vain siinä laajuudessa, kun on tarpeen tässä tietosuojalausekkeessa kuvattujen käyttötarkoitusten toteuttamiseen. 
      Heillä on myös vaitiolovelvollisuus liittyen kaikkeen asiakkaan taloushallinnon tietoon ja henkilötietoon. 
      </p>
      <p>
      Annamme pyydettäessä lisätietoja henkilötietojen käsittelijöistä.
      </p>
      <br /><Header headline={mainHeading[7]} />
      <br /><p>
      Lakisääteisten taloushallinnon palveluiden tuottamisessa käsittelemme henkilötietoja vain EU- tai ETA-maissa sijaitsevia toimijoita ja palveluja hyödyntäen. 
      </p>
      <p>
      Muiden palvelujemme, kuten esimerkiksi verkkosivujemme, toteuttamiseen saatamme käyttää myös EU- tai ETA-maiden ulkopuolella sijaitsevia toimijoita, palveluja ja palvelimia. 
      Siirrot toteutetaan lainsäädännön edellyttämällä tavalla, esimerkiksi EU:n hyväksymiä mallisopimuslausekkeita käyttäen ja näin varmistetaan, 
      että henkilötietojen suoja on riittävällä tasolla sekä käsittely tapahtuu tämän tietosuojalausekkeen mukaisesti.
      </p>
      <br /><Header headline={mainHeading[8]} />
      <br /><p>
      Henkilötiedot ovat suojattu teknisin ja organisatorisin keinoin. Tiedot tallennetaan palvelimille ja järjestelmiin, jotka ovat palomuurein, salasanoin ja muilla teknisillä keinoilla suojattuja. 
      Pääsy henkilötietoihin myönnetään vain, mikäli se on tietojen käsittelyn kannalta välttämätöntä. Kaikki henkilötietojen käsittelijät ovat vaitiolovelvollisia.
      </p>
      <br /><Header headline={mainHeading[9]} />
      <br /><p>
      Käytämme evästeitä, ja muita vastaavia menetelmiä verkkosivujemme ja palvelujen tarjoamiseen ja kehittämiseen. Sivuillamme voi olla myös muita ulkopuolisten toimijoiden komponentteja esimerkiksi yhteisöpalveluihin liittyen.
      </p>
      <br /><Header headline={mainHeading[10]} />
      <br /><p>
      Henkilötietoja käsitellään niin pitkään kuin palveluita toimitetaan toimeksiantosopimuksen mukaisesti tai voimassa oleva lainsäädäntö edellyttää tiedon säilyttämistä.
      </p>
      <p>
      Oikeutetun edun perusteella käsiteltyjä henkilötietoja käsitellään niin kauan kuin niiden käsittelylle on olemassa perusteet. Jos vastustat tällaista käsittelyä, tietosi poistetaan sen jälkeen, kun pyyntösi oikeutus on varmistettu.
      </p>
      <br /><Header headline={mainHeading[11]} />
      <br /><p>
      Kun käsittelemme rekisterinpitäjänä henkilötietoja, meidän on toteutettava asianmukaiset toimenpiteet tietosuojaoikeuksiesi toteuttamiseksi. Toimenpiteiden on myös helpotettava sinua käyttämään oikeuksiasi.
      </p>
      <p>
      Tietosuoja-asetuksen mukaan sinulla on oikeus: 
      </p>
      <ul>
        <li><b>tarkastaa omat tietosi. </b> Sinulla on oikeus saada tieto, käsitelläänkö tietojasi. 
        Jos tietojasi käsitellään, sinulla on oikeus tarkastaa sinua koskevat tiedot.
        </li>
        <li><b>pyytää virheellisten tietojen oikaisemista</b></li>
        <li><b>pyytää vanhentuneiden tai muutoin perusteettomasti käsiteltävien tietojen poistamista</b></li>
        <li><b>pyytää tietyissä tapauksissa käsittelyn rajoitusta</b></li>
        <li><b>vastustaa oikeutettuun tai yleiseen etuun perustuvaa tietojen käsittelyä </b>
        (esimerkiksi kieltää suoramarkkinointi)</li>
        <li><b>pyytää tietojensa siirtämistä </b> silloin, kun tietoja käsitellään sopimuksen tai suostumuksen perusteella</li>
        <li><b>oikeus peruuttaa antamansa suostumus </b> henkilötietojen käsittelyyn</li>
        <li><b>oikeus tehdä valitus valvovalle viranomaiselle</b></li>
      </ul>
      <p>
        Et kuitenkaan voi käyttää kaikkia oikeuksia kaikissa tilanteissa. Tilanteeseen vaikuttaa esimerkiksi se, millä perusteella henkilötietoja käsitellään. Jos haluat käyttää oikeuksiasi, siitä täytyy lähettää pyyntö meille.
        </p>
        <p>
        Sinulla on oikeus tehdä valitus toimivaltaiselle valvontaviranomaiselle, jos mielestäsi emme ole soveltaneet tietosuojasääntelyä henkilötietojen käsittelyssä. 
        Suomessa valvontaviranomainen on Tietosuojavaltuutetun toimisto, jonka yhteystiedot ja ohjeet löytyvät osoitteesta www.tietosuoja.fi.
        </p>
      <br /><Header headline={mainHeading[12]} />
      <br/><p>
      Päivitämme tätä selostetta tarvittaessa. Voimassa oleva tietosuojaseloste on nähtävillä Reilu Hallinnon internetsivustolla. Tämä seloste on päivitetty 3.9.2021.
      </p>
      <br /><Header headline={mainHeading[13]} />
      <br />
      <dl>
        <dt style={{fontWeight: 'normal'}}>Reilu Hallinto Oy</dt>
        <dt style={{fontWeight: 'normal'}}>Y-tunnus</dt>
        <dt style={{fontWeight: 'normal'}}>1782139-0</dt>
        <dt style={{fontWeight: 'normal'}}>Kutojantie 11</dt>
        <dt style={{fontWeight: 'normal'}}>02630 Espoo</dt>
        </dl>
        <p>Tietosuojaan liittyvissä asioissa voit ottaa yhteyttä:</p>
      <dl>
        <dt style={{fontWeight: 'normal'}}>Ville Syrjäläinen</dt>
        <dt style={{fontWeight: 'normal'}}>029 7031 0608</dt>
        <dt style={{fontWeight: 'normal'}}>etunimi.sukunimi@reiluhallinto.fi</dt>
      </dl>
      </div>
    </div>
  )
}

export default PrivacyPolicy