import React from 'react'
import { TestConsumer } from '../components/context'

type Props = {/* */}
type State = {/* */}

class About extends React.Component<Props, State> {
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
