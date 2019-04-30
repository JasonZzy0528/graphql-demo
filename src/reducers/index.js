import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
import { mergeMap } from 'rxjs/operators'
import { BehaviorSubject, of } from 'rxjs'

// export const browserHistory = createBrowserHistory()
// const initalReducer = {
//   router: connectRouter(browserHistory)
// }
let reducerRegistry = {}
const reducer$ = new BehaviorSubject()
export const reducerRegistry$ = reducer$.pipe(
  mergeMap(reducer => {
    reducerRegistry = { ...reducerRegistry, ...reducer }
    return of(combineReducers(reducerRegistry))
  })
)
export default history => {
  const initalReducer = {
    router: connectRouter(history)
  }
  reducer$.next(initalReducer)
  return combineReducers(initalReducer)
}
