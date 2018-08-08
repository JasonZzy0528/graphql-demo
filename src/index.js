/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Root from './Root'
import 'typeface-roboto'
import 'styles/index.scss'

// Redux store settings
import configureStore from './store/configureStore'

const storeObject = configureStore()
const store = storeObject.store
const history = storeObject.history

ReactDOM.render(
  <Provider store={ store }>
    <Root history={ history } />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
