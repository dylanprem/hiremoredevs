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
		JobPostRequests:[]
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
	      } 
    	});	
	}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<Nav>
			{this.state.ADMIN.map((admins) => {
			return(
				<NavItem key={admins.id}>
				{this.state.authUser.uid === admins.uid ?
				<DropdownButton bsStyle={'info'} title={'ADMIN'} className='job-text'>
				    <MenuItem><Link to={routes.ADMIN_APPROVE_JOB} class='job-text'>JOB POST REQUESTS</Link></MenuItem>
				    <MenuItem><Link to={routes.RECRUITER_SIGNUP_REQUESTS} class='job-text'>RECRUITER SIGNUP REQUESTS</Link></MenuItem>
				</DropdownButton> 
				: null }
				</NavItem>
					);
		        })}
			</Nav>
			: <SignInForm /> }
			</div>
		);
	}
}

export default AdminButton;