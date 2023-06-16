# PracticaReactAvanzado
Práctica REACT AVANZADO

Alumno: @XaviRoca (JUN23)


## Prerequisitos

### Backend: **nodepop-api**

* Instalación 
```
git clone https://github.com/davidjj76/nodepop-api
cd nodepop-api
npm install
``` 
Añadir nodepop-api en el fichero .gitignore

* Ejecución

```
npm start
```

* Swagger --> http://localhost:3001/swagger

**NOTA:** En el repositorio hay una carperta nodepop-api que contiene únicamente la data: ./data y ./uploads, por si se quiere tener un juego de pruebas.

Usuario: xroca@vilamatica.com / 1234

### Librerias necesarias

* **AXIOS** --> npm install axios
* **ROUTER** --> npm install react-router-dom
* **classnames** --> npm install classnames
* **styled-components** --> npm install --save styled-components
* **REDUX** --> npm install redux (https://redux.js.org)
* **REDUX-DevTools** --> npm install --save @redux-devtools/extension (https://github.com/reduxjs/redux-devtools)
* **REDUX-thunk** --> npm install redux-thunk (https://github.com/reduxjs/redux-thunk)
### Plug-in VSC

* **Prettier** - Code formatter

### Extensiones browser

* Developer Tools: **React Developer Tools**
* Redux DevTools: **REDUX-DevTools** 

## Comentarios sobre la práctica

### Redux

* El estado

```js
export const defaultState = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: [],
  },
  tags: {
    areLoaded: false,
    data: []
  },
  ui: {
    isLoading: false,
    error: null,
  },
};
```

* Funcionalidades
  * autenticado
  * anuncios: lista anuncios, crear anuncio, recuperar un anuncio, borrar un anuncio
  * tags: [ pendiente implementar ]
  * ui: estado isLoading

* Módulos específicos
  * Uso de Thunk
  * Uso de Router
  * Uso de middleware

### Test

* TEST files:
  * src/store/__tests__/selectors.js (selectors)
  * src/store/__tests__/reducers.js (reducers)
  * src/store/__tests__/actions.js (sync and async actions, includes jest.fn)
  * src/components/auth/__tests__/LoginPage.js (snapshot, includes jest.mock)

* Result: `npm run test`

```sh
 PASS  src/components/auth/__tests__/LoginPage.js
  LoginPage
    √ snapshot (147 ms)

 › 1 snapshot written.
 PASS  src/store/__tests__/selectors.js (6.417 s)
 PASS  src/store/__tests__/reducers.js (6.465 s)
 PASS  src/store/__tests__/actions.js (6.466 s)
 PASS  src/components/auth/__tests__/LoginPage.js (8.304 s)

Test Suites: 4 passed, 4 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        18.138 s
Ran all test suites.

Watch Usage: Press w to show more.
```








