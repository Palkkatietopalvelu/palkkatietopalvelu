# Frontend palkkatietosovellukselle

Frontend on toteutettu Vite Reactilla.

### Käynnistys ja komennot:

```
npm install

npm run dev
```

#### Lint:

```
npm run lint
```

Lint-virheet voi korjata näin:
```
npm run lint -- --fix
```

### Ympäristömuuttujat:

```VITE_BACKEND_URL```

Kyseinen ympäristömuuttuja määrittää sovelluksen backendin osoitteen. Jos sovellus on ajettu paikallisesti, osoite on todennäköisesti localhostin portti 5000.

### Kansiorakenne

#### /assets

Kansiossa on sovelluksen käyttämät kuvat ja css-tiedostot

#### /src/components

Tiedostot ovat sivun eri komponentteja ja toimintoja, kuten kaikki sivut, lomakkeet, ja tiedostogeneraattorit

#### /src/hooks

Tiedostot käyttävät Reactin hooks-toimintoja

#### /src/reducers

Tiedostot sisältävät sovelluksen eri osiin liittyviä metodeja

#### /src/services

Tiedostot sisältävät metodit, jotka kutsuvat sovelluksen backendiä

### Tiedostot

<b>index.html</b>, <b>src/App.jsx</b>, <b>src/main.jsx</b> ja <b>store.js</b> tiedostot kokoavat sovelluksen eri komponentit yhdeksi sivustoksi

<b>.eslint</b>-tiedostot sisältävät lint-konfiguraatiot

<b>Dockerfile</b> määrittää, miten frontend kontitetaan dockerissa

<b>package</b>-tiedostot sisältävät frontendin käyttämät kirjastot ja komennot, kuten 'npm run'

<b>vite.config.js</b> tiedosto määrittää vite-konfiguraatiot