# Backend palkkatietosovellukselle

Backend on toteutettu Flaskilla.

### Käynnistys ja komennot:
```
poetry install

poetry run invoke start
```

#### Lint:
```
poetry run pylint src
```
#### robot-testit:
```
poetry run invoke robottests
```
#### yksikkötestit:
```
poetry run invoke test
```
#### testikattavuus:
```
poetry run invoke coverage
```
### Tietokanta
päivitä/alusta tietokanta uusimpaan versioon
```
poetry run invoke dbupdate
```
luo uusi versio tietokannan versiohallintaan:
```
poetry run invoke revision
```

### Ympäristömuuttujat

#### Yleiset:

```DATABASE_URL```

Postgresql-tietokanta on erillinen prosessi, ja tietokannan muokkaamista varten pitää olla yhteys tietokantaan. Osoitteen määrittelemiseen tietoa [täällä](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).

```SECRET_KEY```

Salaista avainta käytetään esimerkiksi käyttäjien salasanojen enkryptaamisessa.

```MAIL_USERNAME```, ```MAIL_PASSWORD```, ```MAIL_SERVER``` & ```MAIL_PORT```

Nämä ympäristömuuttujat mahdollistavat sähköpostiviestien lähettämisen smtp-palveluista.

Joskus näiden ympäristömuuttujien arvot eivät toimi lainausmerkkien sisällä, vaan pelkästään heittomerkeissä.

```SMS_PASSWORD```

Tekstari.fi käyttäjän salasana. Sovellus on kovakoodattu käyttämään kyseistä palvelua tekstiviestien lähettämistä varten.

```CORS_ORIGINS```

Cors-suojaus määrittää, mistä osoitteista sovelluksen backendiä/apia voi kutsua. Tuotannossa tämän kuuluisi olla frontendin osoite, jos arvo on "*", sovellus ei ole suojattu.

#### Tietokanta:

```ADMIN_USERNAME``` & ```ADMIN_PASSWORD```

Tietokantaa alustaessa käyttäen poetryn dbupdate komentoa, sovellukseen lisätään käyttäjätunnukset näillä arvoilla. Sovelluksessa ei voi luoda käyttäjiä kirjautumatta, joten ensimmäiset tunnukset pitää syöttää suoraan tietokantaan.

#### Testit:

```TEST_DATABASE_URL```

Tietokanta, jota käytetään yksikkö- ja robottesteissä. Tämä tietokanta tyhjennetään testejä varten, joten älä käytä tietokantaa, jossa on jotain tärkeää.

```FLASK_ENV```

Tietokannan suojaamiseksi, testien suorittaminen sallitaan vain, jos tämän ympäristömuuttujan arvo on "development".

### Kansiorakenne

#### /file_storage
Tänne tallennetaan asiakaskäyttäjien palauttamat aineistot

#### /src/controllers
Tiedostot hallitsevat sovelluksen eri osoitteita

#### /src/migrations
Tiedostot liittyvät sovelluksen tietokannan versionhallintaan alembicilla

#### /src/models
Tiedostot sisältävät malleja, jotka helpottavat joidenkin tietokannan elementtejen hallitsemisessa

#### /src/sched_settings
Tiedostot sisältävät automaattisten muistutusten asetukset

#### /src/tests
Tiedostot sovelluksen robot- ja yksikkötesteihin liittyen

#### /src/utilities
Tiedostot sisältävät metodeja backendin toimintoihin liittyen, kuten tietokannan tietojen hallitsemista

### Tiedostot

<b>.coveragerc</b> määrittää, mitkä tiedostot eivät sisälly coverageen

<b>.pylintrc</b> määrittää, mitkä tiedostot eivät sisälly linttiin

<b>Dockerfile</b> määrittää, miten backend kontitetaan dockerissa

<b>poetry.lock</b> & <b>pyproject.toml</b> sisältävät backendin käyttämät kirjastot

<b>pytest.ini</b> määrittää, mitä .env tiedostoa käytetään testejä ajaessa

<b>tasks.py</b> sisältää sovelluksen poetry-komennot, kuten 'poetry run invoke start'


#### /src
<b>app.py</b> on backendin juuritiedosto

<b>AppLibrary.py</b> sisältää metodeja, joita tarvitaan testien suorittamiseen

<b>check_env.py</b> tarkistaa, onko ```FLASK_ENV="development"```

<b>config.py</b> sisältää konfiguraatiota robottestejä varten

<b>daily_scheduler.py</b> sisältää toimintoja, joita sovellus ajaa kerran päivässä

<b>db.py</b> sisältää yhteyden sovelluksen tietokantaan

<b>initialize_db.py</b> alustaa tietokannan; käytetään testeissä

<b>mail_scheduler.py</b> sisältää metodeja liittyen automaattisiin muistutuksiin

<b>schema.sql</b> sisältää sovelluksen tietokannan rakenteen




