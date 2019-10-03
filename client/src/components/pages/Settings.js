import React, { Component } from 'react';
import Tile from '../common/Tile';
import { connect } from 'react-redux';
import { getCurrentUser, updateUser } from '../../actions/userActions';
import Moment from 'react-moment';

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 600px)',
    gridColumnGap: 25,
    gridRowGap: 25
  }
};

class Settings extends Component {
  state = {
    errors: {},
    editable: false,
    firstName: '',
    lastName: '',
    email: '',
    memberSince: ''
  };

  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps.user;
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      memberSince: user.createdAt
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdateUser = () => {
    const updatedUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };

    this.props.updateUser(updatedUser);

    this.setState({
      editable: false
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1> Settings</h1>

        <div style={styles.wrapper}>
          <Tile width={600}>
            <p>
              <strong>Family code </strong>
              <pre style={{ color: '#000' }}>{this.props.auth.user.familyCode}</pre>
            </p>
            <p>
              Keep this code safe. Share it with those that you would like to have join your family.
            </p>
            <div class='ui divider'></div>
            <p style={{ color: '#cc0000' }}>
              <strong>Warning: </strong> If your family code is compromised, please regenerate it
              below.
            </p>
            <button className='ui button' disabled>
              Generate New Code
            </button>
          </Tile>

          <Tile width={600}>
            <p>
              <strong>Profile </strong>
            </p>
            <p>
              {' '}
              Member since: <Moment format='DD MMM YYYY' date={this.state.memberSince} />
            </p>
            <div class='ui divider'></div>

            {this.state.editable ? (
              <button
                style={{ marginBottom: 15 }}
                className='ui button'
                onClick={this.handleUpdateUser}
              >
                Save Updates
              </button>
            ) : (
              <button
                style={{ marginBottom: 15 }}
                className='ui button'
                onClick={(prevState) => this.setState({ editable: true })}
              >
                Edit Profile
              </button>
            )}

            <form onSubmit={this.onSubmit} className='ui form'>
              <div className={`field ${errors.firstName ? 'error' : ''}`}>
                <label>{errors.firstName ? <p>{errors.firstName}</p> : 'First Name'}</label>
                <input
                  disabled={!this.state.editable}
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
                  disabled={!this.state.editable}
                  placeholder='Last Name'
                  name='lastName'
                  type='text'
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
              <div className={`field ${errors.email ? 'error' : ''}`}>
                <label>{errors.email ? <p>{errors.email}</p> : 'Email'}</label>
                <input
                  disabled={!this.state.editable}
                  placeholder='Last Name'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </form>
          </Tile>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
  auth: state.auth,
  family: state.family
});

export default connect(
  mapStateToProps,
  { getCurrentUser, updateUser }
)(Settings);
