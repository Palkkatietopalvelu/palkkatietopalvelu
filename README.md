[![GHA_workflow_badge](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/workflows/CI/badge.svg)](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/actions/workflows/main.yml)

[![linting: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/pylint-dev/pylint)

# Palkkatietopalvelu
* Palvelu, jolla tilitoimisto voi vastaanottaa palkkatietoja asiakkailtaan.
* Tilitoimisto voi määrittää eräpäivät tietojen toimittamiselle.
* Palvelu muistuttaa asiakasta puuttuvista tiedoista automaattisesti eräpäivän lähestyessä.
## Asennus ja käynnistysohjeet

- Kloonaa repo
- Luo .env-tiedosto projektin juureen ja lisää sinne nämä muuttujat:
  >DATABASE_URL="sinun_osoite"
  >
  >SECRET_KEY="sinun_salainen_avain"
  >
  >VITE_BACKEND_URL="http://localhost:5000"

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

robot-testit:
> poetry run invoke robottests

yksikkötestit:
> poetry run invoke test

testikattavuus:
> poetry run invoke coverage

## Backlogit
[backlog](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)
