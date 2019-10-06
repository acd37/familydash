import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';

import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/pages/Register';

// Persistent Login
if (localStorage.familydash) {
  setAuthToken(localStorage.familydash);

  const decoded = jwtDecode(localStorage.familydash);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <div>
              <Route exact path='/' component={Login} />
              <Route exact path='/register' component={Register} />

              <Switch>
                <PrivateRoute path='/dashboard' component={Dashboard} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
