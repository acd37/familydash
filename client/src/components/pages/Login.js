import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const styles = {
  appHeader: {
    background:
      'linear-gradient(to right, rgba(146, 254, 157,0.4) 0%, rgba(0, 201, 255, 0.4) 100%)',
    height: 300,
    fontWeight: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  svg: {
    width: '100%',
    transform: 'translateY(-80px)'
  },
  header: {
    marginTop: 30,
    fontWeight: '600',
    fontSize: '4em',
    letterSpacing: 1.2,
    maxWidth: '100%'
  },
  cardWrapper: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-175px',
    top: '50%',
    marginTop: '-100px',
    borderRadius: 10,
    backgroundColor: '#edf2f7',
    width: 375,
    padding: 50,
    maxWidth: '90%',
    boxShadow: '0 12px 15px rgba(0,0,0,0.1), 0 17px 50px rgba(0,0,0,0.1)'
    // transform: 'translateY(-250px)'
  }
};

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
      <div style={{ position: 'relative' }}>
        <div style={styles.appHeader}></div>
        <div style={styles.svg}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='#fff'
            opacity='1'
            width='100%'
            height='80'
            preserveAspectRatio='none'
            viewBox='0 0 1600 200'
          >
            <path
              d='M-8,95.3C-8,95.3,189,2,398,2s604,184.7,800,184.7s412-91.4,412-91.4V271H-8V95.3
  z'
            />
            <path
              d='M1610,95.3c0,0-216,80-412,80c-98,0-245.8-40.5-395.1-80.9
  c149.4,46.2,297.1,92.3,395.1,92.3C1394,186.7,1610,95.3,1610,95.3z'
            />
          </svg>
        </div>

        <div style={styles.cardWrapper}>
          <h1
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 1.1,
              fontWeight: '300'
            }}
          >
            {' '}
            FamilyDash{' '}
          </h1>

          <h1
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 1.1,
              fontWeight: '300'
            }}
          >
            Login
          </h1>
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
                autoComplete='password'
                placeholder='Password'
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <input type='submit' className='ui button grey fluid' />
          </form>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link to='/register'>Create an Account</Link>
          </div>
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
