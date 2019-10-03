import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

function Navbar(props) {
  let authenticatedContent;

  if (
    props.auth.isAuthenticated &&
    Object.keys(props.family.family === null || props.family.family).length > 0
  ) {
    authenticatedContent = (
      <>
        <Link className='item' to='/dashboard'>
          Home
        </Link>

        <div className='right menu'>
          <Link className='item' to='/dashboard/settings'>
            Settings
          </Link>
          <div className='item'>
            <button className='ui button' onClick={props.logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </>
    );
  } else {
    authenticatedContent = '';
  }

  return (
    <nav className='ui inverted menu ' style={{ borderRadius: 0 }}>
      <div className='ui container'>
        <span className='header item'>FamilyDash</span>
        {authenticatedContent}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  family: state.family
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
