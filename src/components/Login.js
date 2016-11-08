import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className="login-screen-container">
        <h1 className="login-header">WELCOME TO ALANSLIST</h1>
          <button
            className="login-button"
            onClick={auth.login.bind(this)}
            >Login
          </button>
      </div>
    )
  }
}

export default Login;
