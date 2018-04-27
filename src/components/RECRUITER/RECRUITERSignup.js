import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';
import SignInForm from '../Auth/login';

class RECRUITERSignup extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			RECRUITER:[],
			RECRUITERSignupRequests:[]
		}
	}


	

	componentDidMount(){
    	const recruiterRef = firebase.database().ref('RECRUITER');
	        recruiterRef.once('value', (snapshot) => {		
			    let RECRUITER = snapshot.val();
			    let newState = [];
			    for (let r in RECRUITER){
			      newState.push({
			        id: r,
					uid:RECRUITER[r].uid,
			      });

			    }
			    this.setState({
			      RECRUITER: newState
			    });
			  });

		const signupRef = firebase.database().ref('RECRUITERSignupRequests');
	        signupRef.once('value', (snapshot) => {		
			    let RECRUITERSignupRequests = snapshot.val();
			    let newState = [];
			    for (let s in RECRUITERSignupRequests){
			      newState.push({
			        id: s,
					uid:RECRUITERSignupRequests[s].uid,
			      });

			    }
			    this.setState({
			      RECRUITERSignupRequests: newState
			    });
			  });

		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });

	        
			} 
    	});	
	}

	componentDidUpdate() {
		firebase.database().ref("RECRUITER").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
		    const userData = snapshot.val();
		    if (userData){
				    document.getElementById("recSignupButton").style.display = "none";
		    } else {
				    document.getElementById('recSignupButton').style.display = "block";
			}
		});

		firebase.database().ref("RECRUITERSignupRequests").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
		    const userDataAlt = snapshot.val();
		    if (userDataAlt){
				    document.getElementById("recSignupButton").style.display = "none";
		    } else {
				    document.getElementById('recSignupButton').style.display = "block";
			}
		});
	}
	

	render() {
		return (
			<div>
			{this.state.authUser ?
				<div id="recSignupButton">
					<Link to={routes.RECRUITER_SIGNUP_FORM} className='btn yellow-button job-text'>Recruiter Registration</Link>
				</div>
				:
				<SignInForm />
			}
			</div>

		);
	}
}

export default RECRUITERSignup;

