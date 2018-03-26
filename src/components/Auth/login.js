import React, { Component } from 'react';
import { withRouter, history, Link } from 'react-router-dom';
import { auth, provider, providerAlt } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import DualFeed from '../feeds/dualFeed';
import * as firebase from 'firebase';
import './auth.css';
import gmail from './auth-images/gmail.png';
import github from './auth-images/github.png';


const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
  </div>



class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser:null,
    
    }

    this.loginWithGoogle = this.loginWithGoogle.bind(this); 
    this.loginWithGitHub = this.loginWithGitHub.bind(this);
      
  }

 
  loginWithGoogle() {
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

     loginWithGitHub() {
      auth.signInWithPopup(providerAlt) 
        .then((result) => {
          const token = result.credential.accessToken;
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
                <button className="btn btn-default google-btn git-btn" onClick={this.loginWithGitHub}><span><img src={github} /></span> Login With GitHuB</button>
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