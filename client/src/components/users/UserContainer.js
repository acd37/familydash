import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { getUsers } from '../../actions/userActions';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
};

class UserContainer extends Component {
  componentDidMount() {
    // get all users
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.users;

    return (
      <div style={styles.wrapper}>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserContainer);
