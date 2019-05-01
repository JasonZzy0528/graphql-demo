import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { TestProvider } from 'components/context'
import { hot } from 'react-hot-loader/root'

const AsyncHome = Loadable({
  loader: () => import('containers/Home'),
  loading: LoadingComponet
})

const AsyncLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ 'containers/Login'),
  loading: LoadingComponet
})

const AsyncAbout = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ 'containers/About'),
  loading: LoadingComponet
})

class Root extends Component {
  constructor(props) {
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
        <ul>
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
        <Switch>
          {/* <AsyncHeader title='test'/> */}
          <Route exact path="/home" component={AsyncHome} />
          <Route path="/login" component={AsyncLogin} />
          {/* <Route path='/svg' component={AsyncSVG} /> */}
          <TestProvider value={this.state.test}>
            <Route path="/about" component={AsyncAbout} />
          </TestProvider>
        </Switch>
      </ConnectedRouter>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object
}

export default hot(Root)
