import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
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
    let errors = {};

    if (!this.state.firstName) {
      errors.firstName = 'This field is required.';
      this.setState({
        errors
      });
    }

    if (!this.state.lastName) {
      errors.lastName = 'This field is required.';
      this.setState({
        errors
      });
    }

    if (!this.state.email) {
      errors.email = 'This field is required.';
      this.setState({
        errors
      });
    }

    if (!this.state.password) {
      errors.password = 'This field is required.';
      this.setState({
        errors
      });
    }

    if (!this.state.password2) {
      errors.password2 = 'This field is required.';
      this.setState({
        errors
      });
    } else {
      const userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };

      this.props.registerUser(userData, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div style={{ width: 450, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 300 }}>FamilyDash</h1>
        <h2 style={{ textAlign: 'center', fontWeight: 300 }}> Register</h2>
        <img
          src={require('../../assets/images/paper-plane.png')}
          alt='paper plane logo'
          style={{ height: 100, margin: '30px auto', display: 'block' }}
        />
        <form onSubmit={this.onSubmit} className='ui form'>
          <div className={`field ${errors.firstName ? 'error' : ''}`}>
            <label>{errors.firstName ? <p>{errors.firstName}</p> : 'First Name'}</label>
            <input
              placeholder='First Name'
              name='firstName'
              type='text'
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </div>

          <div className={`field ${errors.lastName ? 'error' : ''}`}>
            <label>{errors.lastName ? <p>{errors.lastName}</p> : 'Last Name'}</label>
            <input
              placeholder='Last Name'
              name='lastName'
              type='text'
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </div>

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

          <div className={`field ${errors.password2 ? 'error' : ''}`}>
            <label>{errors.password2 ? <p>{errors.password2}</p> : 'Confirm Password'}</label>
            <input
              placeholder='Confirm Password'
              name='password2'
              type='password'
              value={this.state.password2}
              onChange={this.onChange}
            />
          </div>
          <input type='submit' className='ui button' value='Sign Up' />
        </form>
        <div style={{ marginTop: 10, fontSize: '0.8rem' }}>
          Already registered? <Link to='/'>Back to Login</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
