import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ConnectedRouter
} from 'connected-react-router'
import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'

// import About from 'containers/About'


// const AsyncHeader = Loadable({
//   loader: () => import('components/common/header'),
//   loading: LoadingComponet
// })

const AsyncHome = Loadable({
  loader: () => import('containers/Home'),
  loading: LoadingComponet
})

const AsyncAbout = Loadable({
  loader: () => import('containers/About'),
  loading: LoadingComponet
})

class Root extends Component {
  render() {
    const { history } = this.props
    if (!this.props) {
      return null
    }

    return (
      <ConnectedRouter history={history}>
        <div>
          {/* <AsyncHeader title='test'/> */}
          <Route exact path='/' component={AsyncHome} />
          <Route exact path='/about' component={AsyncAbout} />
        </div>
      </ConnectedRouter>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object
}

export default Root
