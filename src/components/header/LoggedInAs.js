import React, { Component } from 'react';
import { auth } from '../../firebase';
import * as firebase from 'firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

class LoggedInAs extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null
		}
	}

	componentDidMount(){
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
				<NavItem>
					<p class='logged-in-as'>Logged in as: {this.state.authUser.displayName}</p>
				</NavItem>
				<NavItem>
					<Link className='signup-link' to={routes.VIEW_PROFILE}><img style={{width:40, height:40}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} /></Link>
				</NavItem>
			</Nav>
			:
			null }
			</div>
		);
	}
}

export default LoggedInAs;