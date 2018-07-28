/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'

const AsyncHome = Loadable({
  loader: () => import('containers/Home'),
  loading: LoadingComponet
})

const AsyncAbout = Loadable({
  loader: () => import('containers/About'),
  loading: LoadingComponet
})

const AsyncTopics = Loadable({
  loader: () => import('containers/Topics'),
  loading: LoadingComponet
})

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={AsyncHome}/>
        <Route path="/about" component={AsyncAbout}/>
        <Route path="/topics" component={AsyncTopics}/>
      </Switch>
    </div>
  </Router>
)
export default hot(module)(BasicExample)
