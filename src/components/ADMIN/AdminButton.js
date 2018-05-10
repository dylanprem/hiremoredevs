import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Nav, Navbar, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';
import SignInForm from '../Auth/login';

class AdminButton extends Component {
	constructor(props){
	super(props);
	this.state = {
		authUser: null,
		ADMIN: [],
		JobPostRequests:[],
		isAdmin: false
		}
	}

	componentDidMount() {

	   firebase.auth().onAuthStateChanged((authUser) => {
		      if (authUser) {
		        this.setState({ authUser });
		        firebase.database().ref("ADMIN").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isAdmin:true});
				    } else {
				    	this.setState({isAdmin:false});
				    }
				});


		    	}
    		});	
		}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<div>
			{this.state.isAdmin ?
				<Nav>
				<NavItem>
					<Link to={routes.ADMIN_APPROVE_JOB} class='job-text btn btn-info hidden-xs hidden-sm'>JOB POST REQUESTS</Link>
					<Link to={routes.ADMIN_APPROVE_JOB} class='text-info job-text visible-xs visible-sm'>JOB POST REQUESTS</Link>
				</NavItem>
				<NavItem>
					<Link to={routes.RECRUITER_SIGNUP_REQUESTS} class='job-text btn btn-info hidden-xs hidden-sm'>RECRUITER SIGNUP REQUESTS</Link>
					<Link to={routes.RECRUITER_SIGNUP_REQUESTS} class='job-text text-info visible-xs visible-sm'>RECRUITER SIGNUP REQUESTS</Link>
				</NavItem>
				</Nav>
			: null }			
			</div>
			: null }
			</div>
		);
	}
}

export default AdminButton;