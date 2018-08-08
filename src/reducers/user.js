import {
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_CANCELLED,
  FETCH_USER_REJECTED
} from 'types'
import Immutable from 'immutable'

const initialState = new Immutable.Map({
  user: {},
  isFetchingUser: false,
  error: null
})

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_USER:
    return Object.assign({}, state, {
      user: {},
      isFetchingUser: true,
      error: null
    })
  case FETCH_USER_FULFILLED:
    return Object.assign({}, state, {
      user: action.payload,
      isFetchingUser: false,
      error: null
    })
  case FETCH_USER_CANCELLED:
    return Object.assign({}, state, {
      user: {},
      isFetchingUser: false,
      error: null
    })
  case FETCH_USER_REJECTED:
    return Object.assign({}, state, {
      user: {},
      isFetchingUser: false,
      error: action.payload
    })
  default:
    return state
  }
}

export default UserReducer
