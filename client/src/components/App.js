import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import withAuth from '../hocs/withAuth';
import jwtDecode from 'jwt-decode';
import '../css/universal/App.css';

import UserInterface from './user/UserInterface';
import AdminInterface from './admin/AdminInterface';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);

  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

class App extends Component {
  render() {
    const AuthAdminInterface = withAuth(AdminInterface);

    return (
      <Provider store={store}>
        <div id="app">
          <Switch>
            <Route path="/admin" component={AuthAdminInterface} />
            <Route path="/" component={UserInterface} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
