import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

function Navbar(props) {
  let authenticatedContent;

  if (props.auth.isAuthenticated) {
    authenticatedContent = (
      <>
        <Link className='item' to='/dashboard'>
          <a href='#'>Home</a>
        </Link>

        <Link className='item' to='/dashboard/recipes'>
          Recipes
        </Link>

        <Link className='item' to='/dashboard/settings'>
          Settings
        </Link>

        <span
          className='item'
          onClick={props.logoutUser}
          style={{ cursor: 'pointer', color: '#fff' }}
        >
          Logout
        </span>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
