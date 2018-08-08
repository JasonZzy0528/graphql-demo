// import { ajax } from 'rxjs/observable/dom/ajax'
import { filter, map, mergeMap, flatMap, takeUntil, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { FETCH_USER, FETCH_USER_FULFILLED, FETCH_USER_CANCELLED, FETCH_USER_REJECTED } from 'types'

const BASE_URL = 'https://api.github.com/users/'

const userEpics = {
  fetchUser: username => ({
    type: FETCH_USER,
    payload: username
  }),

  fetchUserFulfilled: payload => ({
    type: FETCH_USER_FULFILLED,
    payload
  }),

  cancelFetchUser: () => ({
    type: FETCH_USER_CANCELLED
  }),

  fetchUserError: (error) => ({
    type: FETCH_USER_REJECTED,
    payload: error.xhr.response
  }),

  fetchUserEpic: action$ => action$.pipe(
    ofType(FETCH_USER),
    filter(action => action.payload !== undefined),
    mergeMap(action => from(fetch(`${BASE_URL}${action.payload}`)).pipe(
      flatMap(response => response.json()),
      map(response => {
        return {
          type: 'FETCH_USER_FULFILLED',
          payload: response
        }
      }),
      takeUntil(action$.pipe(
        ofType(FETCH_USER_CANCELLED)
      )),
      catchError(error => of({
        type: FETCH_USER_REJECTED,
        payload: error.xhr.response
      }))
    ))
  ),
}

export default userEpics
