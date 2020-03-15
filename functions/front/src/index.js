import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import App from './components/App'
import store from './store'

ReactDOM.render(
  <GoogleReCaptchaProvider
    reCaptchaKey="6Ld3hswUAAAAALKq-tkiTvjdMZYjxbTcN5IbCZQk"
    language="en"
  >
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </GoogleReCaptchaProvider>,
  document.getElementById('root'),
)
