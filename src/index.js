/* @flow */
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './routes'

const rootEl = document.getElementById('root')

if (rootEl !== null) {
  ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ), rootEl)
}
