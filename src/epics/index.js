import { combineEpics } from 'redux-observable'
import UserEpics from './user'

const rootEpic = combineEpics(
  UserEpics.fetchUserEpic
)

export default rootEpic
