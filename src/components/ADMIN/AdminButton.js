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

	  const ADMINref = firebase.database().ref('ADMIN');
	  ADMINref.on('value', (snapshot) => {
	  	let ADMIN = snapshot.val();
	  	console.log(snapshot.val());
	  	let newState = [];
	  	for (let admins in ADMIN){
	      newState.push({
	      	id: admins,
			uid: ADMIN[admins].uid,
	      });
	    }
	    this.setState({
	      ADMIN: newState
	    });
	  });

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
					<Link to={routes.ADMIN_APPROVE_JOB} class='job-text btn btn-info'>JOB POST REQUESTS</Link>
				</NavItem>
				<NavItem>
					<Link to={routes.RECRUITER_SIGNUP_REQUESTS} class='job-text btn btn-info'>RECRUITER SIGNUP REQUESTS</Link>
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