import { combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

const epicRegistry = []
export const epic$ = new BehaviorSubject(combineEpics(...epicRegistry))

const rootEpic = (action$, state$) =>
  epic$.pipe(mergeMap(epic => epic(action$, state$)))

export default rootEpic
