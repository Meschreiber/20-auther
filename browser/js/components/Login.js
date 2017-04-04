import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../redux/login'

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    // this.state = {};
    // this.handleChange = this.handleChange.bind(this);
    // this.setState.email = '';
    // this.setState.password = '';
  }

  // Good for 'active valuations'  any time you want to actually check up on what is written in the field
  handleChange(type) {
    return (event) => {
      const value = event.target.value
      this.setState({ [type]: value })
      // console.log('from handleChange', this.state.email)
    }
  }

    onLoginSubmit(event) {
      const { message } = this.props;
      event.preventDefault();
      // console.log('from Login.js', event.target.email.value);
      // if (this.state.email && this.state.password) {
      //   this.props.loginUser(this.state.email, this.state.password)
      if (event.target.email.value && event.target.password.value) {
        const user = {email: event.target.email.value, password: event.target.password.value};
        this.props.loginUser(user)
      }
    }
  

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
                onChange={this.handleChange('password')}
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }
}



  /* -----------------    CONTAINER     ------------------ */

  const mapState = () => ({ message: 'Log in' });
  const mapDispatch = { loginUser }

  export default connect(mapState, mapDispatch)(Login);
