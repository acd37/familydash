import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

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
      <div style={{ width: 450, margin: '0 auto', maxWidth: '90%' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 300 }}>FamilyDash</h1>
        <h2 style={{ textAlign: 'center', fontWeight: 300 }}> Login</h2>

        <img
          src={require('../../assets/images/paper-plane.png')}
          alt='paper plane logo'
          style={{ height: 100, margin: '30px auto', display: 'block' }}
        />
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
          <input type='submit' className='ui button' />
        </form>
        <div style={{ marginTop: 10 }}>
          Not registered? <Link to='/register'>Get Started!</Link>
        </div>
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
