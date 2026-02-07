import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { RegionalSettingsProvider } from './contexts/RegionalSettingsContext'
import './i18n'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RegionalSettingsProvider>
          <App />
        </RegionalSettingsProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)

