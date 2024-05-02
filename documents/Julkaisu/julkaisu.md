# Ohjeet sovelluksen julkaisemiseen

Oletuksena on palvelin jolle on git, docker (ja vaihtoehtoisesti python poetry-kirjastolla tietokannan alustamisen helpottamiseksi) asennettuna.

Sovelluksen voi julkaista monella eri tavalla, tämä on vain yksi esimerkki niistä.

#### 1. Lataa repositorio palvelimelle:
```git clone https://github.com/Palkkatietopalvelu/palkkatietopalvelu.git```

#### 2. Luo ympäristömuuttujat:
- Siirry repositorion juurikansioon ja luo .env tiedostot frontend ja backend kansioihin
- Lisää tiedostoihin tarvittavat ympäristömuuttujat readmen mukaisesti 

#### 3. Luo sovelluksen imaget:

```docker compose build```

Voit tarkistaa että imaget Palkkatieto-back ja Palkkatieto-front ovat luotu ajamalla komennon 

```docker images```

#### 4. Luo palvelimelle uusi kansio ja lisää sinne docker-compose.yaml

[Dockerin dokumentaatio](https://docs.docker.com/compose/)

[Esimerkki](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/blob/main/documents/Julkaisu/docker-compose.yaml)

#### 5. Luo kansioon myös nginx.conf

[Nginx dokumentaatio](https://www.nginx.com/resources/wiki/start/)

[Esimerkki](https://github.com/Palkkatietopalvelu/palkkatietopalvelu/blob/main/documents/Julkaisu/nginx.conf)

#### 6. Aja kontit:

- Aja komento ```docker compose up -d```

Voit tarkistaa konttien tilat komennolla:
```docker ps -a```

#### 7. Tietokannan luonti

Backend-sovelluksessa on alembic kirjasto tietokannan alustamisen helpottamiseksi:

- siirry ladatun repositorion backend kansioon
- Aja ```poetry install```
- Aja ```poetry run invoke dbupdate ```

Nyt postgres-tietokannassa pitäisi olla tietokanta alustettuna ja admin tunnukset luotuna

Jos jäkimmäinen komento ei aja koska portti on varattu, pysäytä porttia käyttävä sovellus komennon ajon ajaksi.

#### 8. Tarkista että konttien portit ovat palomuurin takana

Jos tietokanta tai backend ovat suoraan auki ulkoiseen verkkoon, pahantahtoiset tahot voivat päästä salattuun tietoon käsiksi

#### 9. Jos sovellus toimii, voit poistaa githubista ladatun repositorion

## Olennaisia kysymyksiä

**K:** Miksi ympäristömuuttujat luodaan docker imageihin eikä syötetä suoraan kontteihin? Miksei sovelluksen kontteja ladata suoraan verkosta?

**V:** NodeJS sovellusten, kuten frontendin ympäristömuuttujia ei voi muokata sovelluksen buildauksen jälkeen. Se, että backendin ymperistömuuttujat ovat sovelluksen kansiossa myös mahdollistaa helpon tietokannan alustuksen.

**K:** Miksi tietokanta alustetaan näin?

**V:** Tietokannan scheman ja admin-tunnukset voi myös luoda käsin. Ohjeessa oleva tapa ei vaadi sql-komentojen kirjottamista ja takaa että admin-tunnukset ovat enkyptroidut salatulla avaimella.
