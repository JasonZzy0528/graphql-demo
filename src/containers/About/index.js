import React from 'react'
import { TestConsumer } from 'components/context'
import asyncUserReducer from 'reducers/user'
import { reducerRegistry$ } from 'reducers'
reducerRegistry$.next({ UserReducer: asyncUserReducer })
class About extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <TestConsumer>
          {
            context => <h2>About { context.test }</h2>
          }
        </TestConsumer>
      </div>
    )
  }
}

export default About
