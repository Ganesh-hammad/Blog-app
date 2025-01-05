import React from 'react';
import { createRoot } from 'react-dom/client'
import 'flowbite/dist/flowbite.min.css';
import './index.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store, persistor } from './reduxtoolkit/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';


createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
         <App />
      </ThemeProvider>
    </Provider>,
  </PersistGate>
)
