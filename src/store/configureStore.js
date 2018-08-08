import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { persistState } from 'redux-devtools'

import rootEpic from 'epics'
import rootReducer from 'reducers'

const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const logger = createLogger({
  level: 'info',
  collapsed: true
})

const epicMiddleware = createEpicMiddleware()


export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
      applyMiddleware(epicMiddleware, routeMiddleware, logger),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )
  )

  epicMiddleware.run(rootEpic)

  return {
    store,
    history
  }
}
