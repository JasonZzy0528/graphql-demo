import createReducer, { reducerRegistry$ } from 'reducers'
import { createBrowserHistory } from 'history'
import rootEpic from 'epics'
import { BehaviorSubject } from 'rxjs'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'connected-react-router'
import { switchMap } from 'rxjs/operators'

export const history = createBrowserHistory()
const reducer = createReducer(history)

export default () => {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  const reduxRouterMiddleware = routerMiddleware(history)
  const epicMiddleware = createEpicMiddleware()
  const epic$ = new BehaviorSubject(rootEpic)

  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap(epic => epic(...args)))
  
  const middleware = [epicMiddleware, reduxRouterMiddleware, logger]

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(...middleware),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  )
  epicMiddleware.run(hotReloadingEpic)
  reducerRegistry$.subscribe(nextReducer => {
    store.replaceReducer(nextReducer)
  })
  if (module.hot) {
    module.hot.accept('../epics', async () => {
      const module = await import('../epics')
      const nextRootEpic = module.default
      epic$.next(nextRootEpic)
    })
    module.hot.accept('../reducers', async () => {
      const module = await import('../reducers')
      const nextRootReducer = module.default(history)
      reducerRegistry$.next(nextRootReducer)
    })
  }

  return store
}
