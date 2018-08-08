// import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ConnectedRouter
} from 'connected-react-router'
import Home from 'containers/Home'
import About from 'containers/About'


// const AsyncHeader = Loadable({
//   loader: () => import('components/common/header'),
//   loading: LoadingComponet
// })

// const AsyncHome = Loadable({
//   loader: () => import('containers/Home'),
//   loading: LoadingComponet
// })

class Root extends Component {
  render() {
    const { history } = this.props
    if (!this.props) {
      return null
    }

    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </div>
      </ConnectedRouter>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object
}

export default Root
