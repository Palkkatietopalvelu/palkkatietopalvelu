# Backend palkkatietosovellukselle

Backend on toteutettu flaskilla

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

Postgresql-tietokanta on erillinen prosessi, ja tietokannan muokkaamista varten pitää olla yhteys tietokantaan. osoitteen määrittelemiseen tietoa [täällä](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

```SECRET_KEY```

Salaista avainta käytetään esimerkiksi käyttäjien salasanojen enkyproinnissa. 

```MAIL_USERNAME```, ```MAIL_PASSWORD```, ```MAIL_SERVER``` & ```MAIL_PORT```

Nämä ympäristömuuttujat mahdollistavat sähköpostiviestien lähettämisen smtp-palveluista.

Joskus näiden ympäristömmuutujien arvot ei toimi lainausmerkkejen sisällä, vaan pelkästään heittomerkeissä.

```SMS_PASSWORD```

Tekstari.fi käyttäjän salasana. sovellus on kovakoodattu käyttämään kyseistä palvelua tekstiviestien lähettämistä varten.

```CORS_ORIGINS```

Cors-suojaus määrittää mistä osoitteista sovelluksen backendiä/apia voi kutsua. Tuotannossa tämän kuuluisi olla frontendin osoite, jos arvo on "*", sovellus ei ole suojattu.

#### Tietokanta:

```ADMIN_USERNAME``` & ```ADMIN_PASSWORD```

Tietokantaa alustaessa käyttäen poetryn dbupdate komentoa, sovellukseen lisätään käyttäjätunnukset näillä arvoilla. Sovelluksessa ei voi luoda käyttäjiä kirjautumatta, joten ensimmäiset tunnukset pitää syöttää suoraan tietokantaan.

#### Testit:

```TEST_DATABASE_URL```
Tietokanta jota käytetään yksikkö- ja robottesteissä. Tämä tietokanta tyhjennetään testejä varten, joten älä käytä tietokantaa missä on mitään tärkeätä.

```FLASK_ENV```
Tietokannan suojaamiseksi, testejen suoritaminen sallitaan vain jos tämän ympäristömuuttujan arvo on "development".

### Kansiorakenne

#### /file_storage
Tänne tallennetaan asiakaskäyttäjien palauttamat aineistot

#### /src/routes
Tiedostot hallitsevat sovelluksen eri osotteita

#### /src/migrations
Tiedostot liittyvät sovelluksen tietokannan versiohallintaan alembicilla

#### /src/models
Tiedostot sisältävät malleja jotka helpottavat joidenkin tietokannan elementtejen hallitsemisessa

#### /src/sched_settings
Tiedostot sisältävät auttomattisten muistutusten asetukset

#### /src/tests
Tiedostot sovelluksen robot-ja yksikkötesteihin liittyen

#### /src/utilities
Tiedostot sisältävät metodeja backendin toimintoihin liittyen, kuten tietokannan tietojen hallitsemista

### Tiedostot

.coveragerc määrittää mitkä tiedostot ei sisälly coverageen

.pylintrc määrittää mitkä tiedostot ei sisälly linttiin

Dockerfile määrittää miten backend kontitetaan dockerissa

poetry.lock & pyproject.toml sisältävät backendin käyttämät kirjastot

pytest.ini määrittää mitä .env tiedostoa käytetään testejä ajaessa

tasks.py sisältää sovelluksen poetry-komennot, kuten 'poetry run invoke start'


#### /src
app.py on backendin juuritiedosto

AppLibrary.py sisältää metodeja joita tarvitaan testejen suorittamiseen

check_env.py Tarkistaa onko flask_env development

config.py sisältää konfiguraatiota robottestejä varten

daily_scheduler.py sisältää toimintoja joita sovellus ajaa kerran päivässä

db.py sisältää yhteyden sovelluksen tietokantaan

initialize_db.py alustaa tietokannan. Tätä käytetään testeissä

mail_schedjuler.py sisälttää metodeja liittyen automaattisiin muistutukssin

schema.sql sisältää sovelluksen tietokannan rakenteen




