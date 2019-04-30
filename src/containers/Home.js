import React from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import userEpics from 'epics/user'
import PropTypes from 'prop-types'
import { epic$ } from 'epics'
import asyncUserReducer from 'reducers/user'
import { reducerRegistry$ } from 'reducers'
reducerRegistry$.next({ UserReducer: asyncUserReducer })

// import Loadable from 'react-loadable'
// import LoadingComponet from 'components/Loading'

// const AsyncTetrahedron = Loadable({
//   loader: () => import('components/Tetrahedron'),
//   loading: LoadingComponet
// })
epic$.next(userEpics.fetchUserEpic)
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.sendRequest = this.sendRequest.bind(this)
  }

  sendRequest () {
    this.props.fetchUser('jinyoung')
    // fetch('https://api.github.com/users/jinyoung').then(res => res.json()).then(res => {console.error(res)})
  }

  render() {
    return (
      <div>
        {/* <AsyncTetrahedron /> */}
        <Button variant="contained" color="primary" onClick={this.sendRequest}>
          Primary1
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetchingUser: state.UserReducer.isFetchingUser,
    user: state.UserReducer.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: username => {
      dispatch(userEpics.fetchUser(username))
    },
    // cancelUserRequest: () => {
    //   dispatch(userEpics.cancelFetchUser())
    // }
  }
}

Home.propTypes = {
  fetchUser: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
