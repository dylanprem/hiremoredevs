import React, { Component } from 'react';
import { withRouter, history, Link, BrowserRouter as BrowserHistory, Route } from 'react-router-dom';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import * as firebase from 'firebase';
import './auth.css';
import gmail from './auth-images/gmail.png';
import facebook from './auth-images/facebook.png';
import profilePicture from './auth-images/profile.png';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser:null,
      Profiles: [],
      userEmail:'',
      userPassword:'',
      regEmail:'',
      regPassword:'',
      profilePicture:'',
      error: null,
      profileCreated: false,
      hasProfile: false
    }
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }


  handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

  loginWithEmailAndPassword(){
    const userEmail = this.state.userEmail;
    const userPassword = this.state.userPassword;
    auth.signInWithEmailAndPassword(userEmail, userPassword)
    .then((result) => {
        const token = result.credential.accessToken;
        const authUser = result.authUser;
        this.setState({ authUser });
    })
    .catch(error => {
        this.setState(byPropKey('error', error));
    })
  }

  loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider(); 
      auth.signInWithPopup(provider) 
        .then((result) => {
          const token = result.credential.accessToken;
          const authUser = result.authUser;
          this.setState({ authUser });
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        })
        .then(() => {
            this.props.history.push(routes.CURRENT_FEED);
        });
    }

    createUser(){
      const regEmail = this.state.regEmail;
      const regPassword = this.state.regPassword;
      firebase.auth().createUserWithEmailAndPassword(regEmail, regPassword)
      .then(function(result) {
          const token = result.credential.accessToken;
          const authUser = result.authUser;
          this.setState({ authUser });
      })
      .catch(error => {
          this.setState(byPropKey('error', error));
      });
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          this.setState({ authUser });
          firebase.database().ref('Profiles').orderByChild('uid').equalTo(this.state.authUser.uid).once("value", (snapshot) => {
            let data = snapshot.val();
            if (data) {
              this.setState({hasProfile:true});
              this.props.history.push(routes.CURRENT_FEED);
            } else {
              firebase.auth().currentUser.updateProfile({
                displayName: "user" + Date.now(),
                photoURL: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png"
              });
              const profilesRef = firebase.database().ref('Profiles');
              const Profiles  = {
                uid: this.state.authUser.uid,
                name: "user" + Date.now(),
                profilePicture: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png",
                email: this.state.authUser.email,
       
              }
              profilesRef.push(Profiles);
              this.setState({profileCreated:true});
              window.location.reload();
            }
          });
          if (this.state.profileCreated) {
            this.props.history.push(routes.CURRENT_FEED);
          }
        } 
      });
    }



  render() {

    return (
    <div className='row dark-bg-login'>
      {this.state.authUser ? 
      null
      :
      <div>
        <div className='col-md-12 text-center text-black'>
          { this.state.error && <p className='text-danger job-text'>{this.state.error.message}</p> }
        </div>
        <div className='col-md-4 col-md-offset-1 login'>
          <div className='panel-group'>
            <div className='panel'>
              <div className='panel-heading'><h3 className='text-center job-text text-black'>Sign In</h3></div>
              <div className='panel-body text-center'>
                  <div className='form-group'>
                    <label className='job-text text-black'>Email</label>
                    <input type="email" className='form-control job-text' name='userEmail' value={this.state.userEmail} placeholder="youremail@gmail.com" onChange={this.handleChange}/>
                  </div>
                  <div className='form-group'>
                    <label className='job-text text-black'>Password</label>
                    <input type="password" className='form-control job-text' name='userPassword' value={this.state.userPassword} onChange={this.handleChange} />
                  </div>
                  <div className='text-center'>
                    <button className="btn black-button job-text margins" onClick={this.loginWithEmailAndPassword}>Login</button>
                  </div>

                  <div className='text-center'>
                    <button className="btn btn-danger google-btn margins" onClick={this.loginWithGoogle}><span><img src={gmail} /></span> Login With Gmail</button>
                  </div>
                  
              </div>
            </div>
            
          </div>
          <div className='text-center'>
            <Link to={routes.FORGOT_PW} className='signup-link job-text'>Forgot Password</Link>
          </div>
        </div>
        <div className='col-md-4 col-md-offset-2 login'>
          <div className='panel-group'>
            <div className='panel'>
              <div className='panel-heading'><h3 className='text-center job-text text-black'>Register</h3></div>
              <div className='panel-body text-center'>
                  <div className='form-group'>
                    <label className='job-text text-black'>Email</label>
                    <input type="email" className='form-control job-text' name='regEmail' value={this.state.regEmail} placeholder="youremail@gmail.com" onChange={this.handleChange}/>
                  </div>
                  <div className='form-group'>
                    <label className='job-text text-black'>Password</label>
                    <input type="password" className='form-control job-text' name='regPassword' value={this.state.regPassword} onChange={this.handleChange} />
                  </div>
                  <div className='form-group'>
                    <button className="btn black-button job-text" onClick={this.createUser}> Register </button>
                  </div>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
    );
  }
}

export default withRouter(SignInForm);