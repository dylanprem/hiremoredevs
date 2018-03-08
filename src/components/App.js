import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

//USERS
import Header from './header/header';
import SignUpPage from './Auth/register';
import SignInPage from './Auth/login';
import DualFeed from './feeds/dualFeed';
import PasswordForgetForm from './Auth/forgotpw';
import PasswordChangeForm from './Auth/changepw';
import PostJobSeeker from './jobseekers/PostJobSeeker';
import PostJob from './jobs/PostJob';
import viewJob from './jobs/viewJob';


import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>


  <Router>
    <div>
      <Header />
      <Route exact path={routes.REGISTER} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetForm />} />
      <Route exact path={routes.PASSWORD_CHANGE} component={() => <PasswordChangeForm />} />
      <Route exact path={routes.CURRENT_FEED} component={() => <DualFeed />} />
      <Route exact path={routes.POST_JOB_SEEKER} component={() => <PostJobSeeker />} />
      <Route exact path={routes.POST_JOB} component={() => <PostJob />} />
      <Route exact path="/job/:viewJob" component={viewJob} />
    </div>
  </Router>

export default withAuthentication(App);