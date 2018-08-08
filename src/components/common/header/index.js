/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'


import Loadable from 'react-loadable'
import LoadingComponet from 'components/Loading'

const AsyncNavigator = Loadable({
  loader: () => import('components/common/navigator'),
  loading: LoadingComponet
})

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [
        {
          title: 'Fetch user (redux-observable)',
          href: process.env.PUBLIC_URL + '/'
        }
      ]
    }
  }

  render() {
    const { title } = this.props

    if (!this.props) {
      return null
    } else {
      return (
        <header id="header">
          <div className="container">
            <div className="logo-wrapper">
              <h1>{title}</h1>
            </div>
            <AsyncNavigator links={this.state.links} />
          </div>
        </header>
      )
    }
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
