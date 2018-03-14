import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

//USERS
import Header from './header/header';
import SignInPage from './Auth/login';
import DualFeed from './feeds/dualFeed';
import PostJob from './jobs/PostJob';
import viewJob from './jobs/viewJob';
import Landing from './Landing/landing';
import viewProfile from './profile/viewProfile';
import editProfile from './profile/editProfile';


import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

import './App.css'

const App = () =>


  <Router>
    <div className='dark-bg'>
      <Header />
      <Route exact path={routes.LANDING} component={() => <Landing />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.CURRENT_FEED} component={() => <DualFeed />} />
      <Route exact path={routes.POST_JOB} component={() => <PostJob />} />
      <Route exact path="/job/:viewJob" component={viewJob} />
      <Route exact path={routes.VIEW_PROFILE} component={viewProfile} />
      <Route exact path="/profile/:editProfile" component={editProfile} />

    </div>
  </Router>

export default withAuthentication(App);