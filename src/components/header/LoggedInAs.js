import React, { Component } from 'react';
import { auth } from '../../firebase';
import * as firebase from 'firebase';
import withAuthorization from '../withAuthorization';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

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
					<img style={{with:40, height:40}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
				</NavItem>
			</Nav>
			:
			null }
			</div>
		);
	}
}

export default LoggedInAs;