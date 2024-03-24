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
      >DATABASE_URL="sinun_osoite"
      >
      >SECRET_KEY="sinun_salainen_avain"
      >
      >MAIL_USERNAME="sinun_mailtrap_username"
      >
      >MAIL_PASSWORD="sinun_mailtrap_salasana"
      
    - Lisää frontendin .env tiedostoon tämä muuttuja:
      >VITE_BACKEND_URL="http://localhost:5000"
      >

  .env-tiedosto on henkilökohtainen, älä ikinä jaa sitä mihinkään.
  DATABASE_URLin määrittelemiseen tietoa [täällä](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

- Aja seuraavat komennot:

### backend:

> poetry install
>
> poetry run invoke start

### frontend:

> npm install

> npm run dev

### Lint

backend:
> poetry run pylint src

frontend:
> npm run lint

Frontendin lint-virheet voi korjata näin:
> npm run lint -- --fix

### Testit
Lisää testien ajon ajaksi backendin .env tiedostoon myös seuraavat:
  >TEST_DATABASE_URL="sinun_osoite"
  >
  >FLASK_ENV="development"

Muista ottaa FLASK_ENV muuttuja pois .env tiedostosta testien ajon jälkeen. Kun FLASK_ENV="development" on määritelty, ohjelma käyttää tietokantana TEST_DATABASE_URL määriteltyä tietokantaa eikä asiakkaita lisätessä lähetetä sähköposteja.

robot-testit:
> poetry run invoke robottests

yksikkötestit:
> poetry run invoke test

testikattavuus:
> poetry run invoke coverage

## Tietokannan muokkaus
backend: 
luo uusi versio tietokannan versiohallintaan:
> poetry run invoke revision

## Backlogit
[backlog](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)
