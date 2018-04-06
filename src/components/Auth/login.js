import React, { Component } from 'react';
import { withRouter, history, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import DualFeed from '../feeds/dualFeed';
import * as firebase from 'firebase';
import './auth.css';
import gmail from './auth-images/gmail.png';
import facebook from './auth-images/facebook.png';


const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>



class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser:null,
      Profiles: [],
    }

    this.loginWithGoogle = this.loginWithGoogle.bind(this); 
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
      
  }

 
  loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider(); 
      auth.signInWithPopup(provider) 
        .then((result) => {
          const token = result.credential.accessToken;
          const authUser = result.authUser;
          this.props.history.push(routes.CURRENT_FEED);
          this.setState({
            authUser
          });
        });
    }

  loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(provider) 
        .then((result) => {
          const authUser = result.authUser;
          this.props.history.push(routes.CURRENT_FEED);
          this.setState({
            authUser
          });
        });  
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          this.setState({ authUser });
        } 
      });
    }




  render() {

    return (
    <div className='row dark-bg-login'>
      <div className='col-md-6 col-md-offset-3 login'>
        <div className='panel-group'>
          <div className='panel'>
            <div className='panel-heading'><h3 className='text-center'>Sign In</h3></div>
            <div className='panel-body text-center'>
                <button className="btn btn-danger google-btn" onClick={this.loginWithGoogle}><span><img src={gmail} /></span> Login With Gmail</button>
                <button className="btn btn-default google-btn fb-btn" onClick={this.loginWithFacebook}><span><img src={facebook} /></span> Login With Facebook</button>
            </div>
            
          </div>
      </div>
    </div>
  </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};