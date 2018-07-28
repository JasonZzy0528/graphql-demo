/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'

const AsyncTopic = Loadable({
  loader: () => import('components/Topic'),
  loading: LoadingComponet
})

type funcArg = {
  match: {
  url: string,
  path: string
}}

const Topics: Function = ({ match }: funcArg) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={AsyncTopic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

Topics.propTypes = {
  match: PropTypes.object
}

export default Topics
