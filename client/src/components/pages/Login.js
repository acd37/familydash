import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit} className='ui form'>
          <div className={`field ${errors.email ? 'error' : ''}`}>
            <label>{errors.email ? <p>{errors.email}</p> : 'Email Address'}</label>
            <input
              placeholder='Email Address'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>

          <div className={`field ${errors.password ? 'error' : ''}`}>
            <label>{errors.password ? <p>{errors.password}</p> : 'Password'}</label>
            <input
              placeholder='Password'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <input type='submit' class='ui button' />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
