/* @flow */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import OverrideCss from 'components/common/themes/OutlinedButton'

import './index.scss'

type Props = {/* */}
type State = {/* */}

class Login extends React.Component<Props, State> {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Grid
        alignItems='center'
        className='login_container'
        container
        justify='center'
      >
        <Grid
          item
          xs={5}
          className='login_left_panel'
        >
          <Grid
            className='login_left_panel_container'
            container
            direction='column'
            justify='center'
          >
            <div
              className='login_left_panel_title'
            >
              Pellentesque purus ligula facilisis in
            </div>
            <Divider className='login_left_panel_divider' />
            <div
              className='login_left_panel_description'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu luctus ligula, quis tristique ipsum. Sed varius sem non venenatis blandit. Maecenas egestas rhoncus mi ac porta. Vestibulum feugiat varius orci, vitae volutpat justo placerat.
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={7}
          className='login_right_panel'
        >
          <Button variant='outlined' color='primary'>
            Primary
          </Button>
          <Button variant='outlined' color='secondary'>
            Secondary
          </Button>
          { OverrideCss() }
        </Grid>
      </Grid>
    )
  }
}

export default Login
