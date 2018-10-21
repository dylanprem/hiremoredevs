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
				 <nav className="row hidden-xs">
				  <div className="col-md-2 col-sm-4 col-xs-12">
				    <div className="logged-in-as-container">
				      <img style={{width:40, height:40}} className='img-responsive img-circle profile-pic' src={this.state.authUser.photoURL} />
				      <p className='logged-in-as'>Logged in as:</p> 
				      <p className='logged-in-as-name'>{this.state.authUser.displayName}</p>
					
				    </div>
				  </div>
				</nav> 
			:
			null }
			</div>
		);
	}
}

export default LoggedInAs;