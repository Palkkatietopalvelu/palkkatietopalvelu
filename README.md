# Palkkatietopalvelu
* Palvelu, jolla tilitoimisto voi vastaanottaa palkkatietoja asiakkailtaan.
* Tilitoimisto voi määrittää eräpäivät tietojen toimittamiselle.
* Palvelu muistuttaa asiakasta puuttuvista tiedoista automaattisesti eräpäivän lähestyessä.
## Asennus ja käynnistysohjeet

- Kloonaa repo
- Luo .env-tiedosto ja lisää sinne nämä asiat:
  >DATABASE_URL="sinun_osoite"
  >
  >SECRET_KEY="sinun_salainen_avain"

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

yksikkötestit:
> poetry run invoke test

robot-testit:
> poetry run invoke robottests

## Backlogit
[backlog](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit#gid=0](https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)https://docs.google.com/spreadsheets/d/1jwWQK4tsHwZ1lQ-sYIJoU5UrBi-TOOu_HQ8tnd9n4GE/edit?usp=sharing)
