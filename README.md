[![GHA_workflow_badge](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/workflows/CI/badge.svg)](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/actions/workflows/main.yml)

[![linting: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/pylint-dev/pylint)

[![codecov](https://codecov.io/gh/Palkkatietopalvelu/palkkatietopalvelu/graph/badge.svg?token=2ZNIBLMX7I)](https://codecov.io/gh/Palkkatietopalvelu/palkkatietopalvelu)

# Palkkatietopalvelu
* Palvelu, jolla tilitoimisto voi vastaanottaa palkkatietoja asiakkailtaan.
* Tilitoimisto voi määrittää eräpäivät tietojen toimittamiselle.
* Palvelu muistuttaa asiakasta puuttuvista tiedoista automaattisesti eräpäivän lähestyessä.
## Asennus ja käynnistysohjeet

- Kloonaa repo
- Luo .env-tiedostot backend ja frontend kansioihin.
    - Lisää backendin .env tiedostoon nämä muuttujat:
      ```
      DATABASE_URL="sinun_osoite"
      SECRET_KEY="sinun_salainen_avain"
      FERNET_KEY="toinen salainen avain"
      MAIL_USERNAME="lähetyssähköpostiosoite_tai_-tunnus"
      MAIL_PASSWORD="lähetyssähköpostin_salasana"
      MAIL_SERVER ='käyttämäsi_smtp_palvelin'
      MAIL_PORT='smtp palvelimen portti'
      SMS_PASSWORD="Tekstari.fi salasana"
      CORS_ORIGINS="*"
      ```
    - Fernet keyn voi luoda seuraavilla komennoilla:
      ```
      python3
      from cryptography.fernet import Fernet
      print(Fernet.generate_key().decode())
      ```
    - Lisää frontendin .env tiedostoon tämä muuttuja:
      ```
      VITE_BACKEND_URL="http://localhost:5000"
      ```

  #### .env-tiedostot sisältävät arkaluontoista tietoa, älä ikinä jaa niitä mihinkään.
  DATABASE_URLin määrittelemiseen tietoa [täällä](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

- Aja seuraavat komennot:

### backend:
```
poetry install

poetry run invoke start
```
### frontend:
```
npm install

npm run dev
```
## Lint

backend:
```
poetry run pylint src
```

frontend:
```
npm run lint
```

Frontendin lint-virheet voi korjata näin:
```
npm run lint -- --fix
```

## Testit
Lisää testien ajon ajaksi backendin .env tiedostoon myös seuraavat:
  ```
  TEST_DATABASE_URL="sinun_osoite"
  
  FLASK_ENV="development"
  ```
Muista ottaa FLASK_ENV muuttuja pois .env tiedostosta testien ajon jälkeen. Kun FLASK_ENV="development" on määritelty, ohjelma käyttää tietokantana TEST_DATABASE_URL määriteltyä tietokantaa eikä asiakkaita lisätessä lähetetä sähköposteja.

robot-testit:
- Osa näistä epäonnistuu satunnaisesti.
- Erityisesti jos "Link expires after use" epäonnistuu, kannattaa ensimmäisenä kokeilla testien ajoa uudelleen.
```
poetry run invoke robottests
```

yksikkötestit:
```
poetry run invoke test
```

testikattavuus:
```
poetry run invoke coverage
```
## Tietokanta
backend: 
#### Admin-tunnukset
Lisää backendin .env-tiedostoon rivit
```
ADMIN_USERNAME = "käyttäjänimi"

ADMIN_PASSWORD = "salasana"
```

päivitä/alusta tietokanta uusimpaan versioon
```
poetry run invoke dbupdate
```
luo uusi versio tietokannan versiohallintaan:
```
poetry run invoke revision
```
Tietokannan alustamisen yhteydessä lisätään ensimmäinen tilitoimistokäyttäjä näiden tietojen avulla.

## Julkaisuohjeet
[julkaisuohjeet](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/blob/main/documents/Julkaisu/julkaisu.md)

## Kaksivaiheinen tunnistautuminen
* Sovelluksessa ei ole tapaa palauttaa käyttäjän pääsyä sovellukseen, mikäli tämä on ottanut kaksivaiheisen tunnistautumisen käyttöön, ja menettänyt pääsyn todennussovellukseensa
* Käyttäjän voi palauttaa poistamalla todennusavainten tietokantataulusta käyttäjää koskevan rivin

## Backlogit
[backlog](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)
