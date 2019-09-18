import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewUser from '../layout/NewUser';
import Content from '../layout/Content';
import { getFamily } from '../../actions/familyActions';

class Dashboard extends Component {
  componentDidMount() {
    // load current profile
    this.props.getFamily();
  }

  render() {
    const { user } = this.props.auth;
    const { family } = this.props.family;

    let dashboardContent;

    if (family === null || Object.keys(family).length === 0) {
      dashboardContent = <NewUser />;
    }
    // check if logged in user has a profile
    else if (Object.keys(family).length > 0) {
      dashboardContent = <Content />;
    }

    console.log(family);

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getFamily }
)(Dashboard);
