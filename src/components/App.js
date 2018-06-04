import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//USERS
import Header from './header/header';
import SignInForm from './Auth/login';
import JobFeed from './feeds/JobFeed';
import PostJobForm from './jobs/PostJob';
import ViewJob from './jobs/viewJob';
import Landing from './Landing/landing';
import publicProfile from './profile/publicProfile';
import CollabCorner from './collab/CollabCorner';
import AddCollab from './collab/AddCollab';
import ViewCollab from './collab/ViewCollab';
import ThankYou from './jobs/ThankYou';
import ThankYouRec from './RECRUITER/ThankYouRec';
import ApproveJob from './ADMIN/ApproveJob';
import ViewJobADMIN from './ADMIN/ViewJobADMIN';
import RECRUITERSignupForm from './RECRUITER/RECRUITERSignupForm';
import RecruiterSignupRequests from './ADMIN/RecruiterSignupRequests';
import ViewSignupRequest from './ADMIN/ViewSignupRequest';
import EditComment from './collab/EditComment';
import RECRUITERPostedJobs from './RECRUITER/RECRUITERPostedJobs';
import Account from './USER/Account';
import AdminHeader from './ADMIN/AdminHeader';
import ForgotPassword from './Auth/ForgotPassword';
import EditCollab from './collab/EditCollab';
import EditProject from './profile/EditProject';
import EditJob from './jobs/EditJob';
import LoggedInAs from './header/LoggedInAs';



import * as routes from '../constants/routes';


import './App.css'

const App = () =>


  <Router>
    <div className='dark-bg'>
      <Header />
      <AdminHeader />
      <LoggedInAs />
      <Route exact path={routes.LANDING} component={Landing} />
      <Route exact path={routes.SIGN_IN} component={SignInForm} />
      <Route exact path={routes.CURRENT_FEED} component={JobFeed} />
      <Route exact path={routes.POST_JOB} component={PostJobForm} />
      <Route exact path="/job/:viewJob" component={ViewJob} />
      <Route exact path="/edit-job/:viewJob" component={EditJob} />
      <Route exact path="/user/:userProfile" component={publicProfile} />
      <Route exact path={routes.COLLAB_CORNER} component={CollabCorner} />
      <Route exact path={routes.ADD_COLLAB} component={AddCollab} />
      <Route exact path="/view-collab/:currentCollab" component={ViewCollab} />
      <Route exact path="/edit-comment/:currentCollab?/:currentComment?" component={EditComment} />
      <Route exact path="/edit-collab/:currentCollab" component={EditCollab} />
      <Route exact path="/edit-project/:currentProject?/:currentProfile?" component={EditProject} />
      <Route exact path={routes.THANK_YOU} component={ThankYou} />
      <Route exact path={routes.THANK_YOU_REC} component={ThankYouRec} />
      <Route exact path={routes.ADMIN_APPROVE_JOB} component={ApproveJob} />
      <Route exact path="/admin-view-job/:viewJobADMIN" component={ViewJobADMIN} />
      <Route exact path={routes.RECRUITER_SIGNUP_FORM} component={RECRUITERSignupForm} />
      <Route exact path={routes.RECRUITER_SIGNUP_REQUESTS} component={RecruiterSignupRequests} />
      <Route exact path={routes.VIEW_POSTED_JOBS_BY_USER} component={RECRUITERPostedJobs} />
      <Route exact path={routes.ACCOUNT} component={Account} />
      <Route exact path="/admin-view-recruiter-request/:viewReq" component={ViewSignupRequest} />
      <Route exact path={routes.FORGOT_PW} component={ForgotPassword} />
    </div>
  </Router>

export default App;