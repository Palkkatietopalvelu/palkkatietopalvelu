# Frontend palkkatietopalvelusovellukselle

Frontend on toteutettu Vite Reactilla

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

Kyseinen ympäriströmuuttuja määrittää sovelluksen backendin osoitteen. Jos sovellus on ajettu paikallisesti, osoite on todennäköisesti localhostin portti 5000

### Kansiorakenne

#### /assets

kansiossa on sovelluksen käyttämät kuvat, kuten reilun logo

#### /src/components

Tiedostot ovat sivun eri komponentteja ja toimintoja, kuten kaikki sivut, lomakkeet, ja tiedostogeneraattorit

#### /src/hooks

Tiedostot käyttävät reactin "hook" toimintoja

#### /src/reducers

Tiedostot sisältävät sovelluksen eri osiin liityviä metodeja

#### /src/services

Tiedostot sisältävät metodit jotka kutsuvat sovelluksen backendiä

### Tiedostot

index.html, src/App.jsx, src/main.jsx ja store.js tiedostot kokoavat sovelluksen eri komponentit yhdeksi sivuksi

.eslint-tiedostot sisältävät lint configuraatiota

Dockerfile määrittää miten frontend kontitetaan dockerissa

package-tiedostot sisältävät frontendin käyttämät kirjastot ja komennot, kuten 'npm run' 

vite.config.js tiedosto määrittää vite-konfiguraatiot