import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ConnectedRouter
} from 'connected-react-router'
import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'

import { TestProvider } from './components/context'
// import About from 'containers/About'

// const AsyncHeader = Loadable({
//   loader: () => import('components/common/header'),
//   loading: LoadingComponet
// })

// const AsyncHome = Loadable({
//   loader: () => import('containers/Home'),
//   loading: LoadingComponet
// })

const AsyncLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ 'containers/Login'),
  loading: LoadingComponet
})

const AsyncAbout = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ 'containers/About'),
  loading: LoadingComponet
})

// const AsyncSVG = Loadable({
//   loader: () => import('containers/SVG'),
//   loading: LoadingComponet
// })

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      test: {
        test: 1
      }
    }
  }

  render() {
    const { history } = this.props
    if (!this.props) {
      return null
    }

    return (
      <ConnectedRouter history={history}>
        <Switch>
          {/* <AsyncHeader title='test'/> */}
          {/* <Route exact path='/' component={AsyncHome} /> */}
          <Route path='/login' component={AsyncLogin} />
          {/* <Route path='/svg' component={AsyncSVG} /> */}
          <TestProvider value={this.state.test}>
            <Route path='/about' component={AsyncAbout} />
          </TestProvider>
        </Switch>
      </ConnectedRouter>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object
}

export default Root
