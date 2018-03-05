import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

//USERS
import Header from './header/header';
import SignUpPage from './Auth/register';
import SignInPage from './Auth/login';
import DualFeed from './feeds/dualFeed';



import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>


  <Router>
    <div>
      <Header />
      <Route exact path={routes.REGISTER} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.CURRENT_FEED} component={() => <DualFeed />} />
    </div>
  </Router>

export default withAuthentication(App);