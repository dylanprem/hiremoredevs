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
			RECRUITERSignupRequests:[],
			isPending: false,
			isRecruiter: false,
		}
	}


	

	componentDidMount(){
		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("RECRUITER").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isRecruiter:true});
				    } else {
				    	this.setState({isRecruiter:false});
				    }
				});
	        firebase.database().ref("RECRUITERSignupRequests").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isPending:true});
				    } else {
				    	this.setState({isPending:false});
				    }
				});
	        
			} 
    	});
	}


	render() {
		return (
			<div>
			{this.state.authUser ?
				<div>
				{this.state.isRecruiter ? null :
					<div>
						{this.state.isPending ? null :
						<Link to={routes.RECRUITER_SIGNUP_FORM} className='btn yellow-button job-text'>Recruiter Registration</Link>
						}
					</div>
				}
				</div>
			: null }
			</div>

		);
	}
}

export default RECRUITERSignup;

