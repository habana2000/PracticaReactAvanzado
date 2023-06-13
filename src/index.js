import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/context';

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}


// quiero utilizar REDUX en mi proyecto

// 1. instalar redux
// 2. instalar react-redux
// 3. crear el store  
// 4. crear el reducer
// 5. crear el action
// 6. crear el componente
// 7. conectar el componente con el store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
