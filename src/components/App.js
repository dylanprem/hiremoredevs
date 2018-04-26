import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

//USERS
import Header from './header/header';
import SignInPage from './Auth/login';
import DualFeed from './feeds/dualFeed';
import PostJobForm from './jobs/PostJob';
import viewJob from './jobs/viewJob';
import Landing from './Landing/landing';
import viewProfile from './profile/viewProfile';
import createProfile from './profile/createProfile';
import editProfile from './profile/editProfile';
import publicProfile from './profile/publicProfile';
import CollabCorner from './collab/CollabCorner';
import AddCollab from './collab/AddCollab';
import ViewCollab from './collab/ViewCollab';
import ThankYou from './jobs/ThankYou';
import ApproveJob from './ADMIN/ApproveJob';
import ViewJobADMIN from './ADMIN/ViewJobADMIN';
import RECRUITERSignupForm from './RECRUITER/RECRUITERSignupForm';
import RecruiterSignupRequests from './ADMIN/RecruiterSignupRequests';
import ViewSignupRequest from './ADMIN/ViewSignupRequest';
import EditComment from './collab/EditComment';


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
      <Route exact path={routes.POST_JOB} component={PostJobForm} />
      <Route exact path="/job/:viewJob" component={viewJob} />
      <Route exact path="/profile/:viewProfile" component={viewProfile} />
      <Route exact path={routes.CREATE_PROFILE} component={createProfile} />
      <Route exact path="/edit/:editProfile" component={editProfile} />
      <Route exact path="/user/:userProfile" component={publicProfile} />
      <Route exact path={routes.COLLAB_CORNER} component={CollabCorner} />
      <Route exact path={routes.ADD_COLLAB} component={AddCollab} />
      <Route exact path="/view-collab/:currentCollab" component={ViewCollab} />
      <Route exact path="/edit-comment/:currentCollab?/:currentComment?" component={EditComment} />
      <Route exact path={routes.THANK_YOU} component={ThankYou} />
      <Route exact path={routes.ADMIN_APPROVE_JOB} component={ApproveJob} />
      <Route exact path="/admin-view-job/:viewJobADMIN" component={ViewJobADMIN} />
      <Route exact path={routes.RECRUITER_SIGNUP_FORM} component={RECRUITERSignupForm} />
      <Route exact path={routes.RECRUITER_SIGNUP_REQUESTS} component={RecruiterSignupRequests} />
      <Route exact path="/admin-view-recruiter-request/:viewReq" component={ViewSignupRequest} />
    </div>
  </Router>

export default withAuthentication(App);