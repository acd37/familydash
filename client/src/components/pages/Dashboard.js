import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewUser from '../layout/NewUser';
import Content from '../layout/Content';
import { getFamily } from '../../actions/familyActions';
import Navbar from '../layout/Navbar';

const styles = {
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
};
class Dashboard extends Component {
  componentDidMount() {
    // load current profile
    this.props.getFamily();
  }

  render() {
    const { family } = this.props.family;
    const { loading } = this.props.loading;

    let dashboardContent;

    if (loading) {
      dashboardContent = (
        <div style={styles.loadingWrapper}>
          <h2 style={{ marginTop: '5%' }}>Loading...</h2>
          <img
            style={{ height: 125, width: 125 }}
            src={require('../../assets/images/paper-plane.png')}
          />
        </div>
      );
    } else if (family === null || Object.keys(family).length === 0) {
      dashboardContent = <NewUser />;
    }
    // check if logged in user has a profile
    else if (Object.keys(family).length > 0) {
      dashboardContent = <Content />;
    }
    return (
      <div>
        {' '}
        <Navbar />
        {dashboardContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family,
  errors: state.errors,
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { getFamily }
)(Dashboard);
