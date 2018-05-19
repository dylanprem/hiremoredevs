import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import './style.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import LoggedInAs from './LoggedInAs';
import * as routes from '../../constants/routes';
import ProfileButtonToggle from './ProfileButton';

import RECRUITERButton from '../RECRUITER/RECRUITERButton';
import RECRUITERManageJobsButton from '../RECRUITER/RECRUITERManageJobsButton';
import RECRUITERSignup from '../RECRUITER/RECRUITERSignup';
import LogoutButton from '../Auth/Logout';


class Header extends Component {
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
			<Navbar inverse collapseOnSelect>
			  <Navbar.Header>

			    <Navbar.Brand>
			      <Link to="/" className="navbar-brand logo">HireMoreDevs</Link>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav pullRight>
			      <NavItem>
			      	<Link className='signup-link job-text' to={routes.CURRENT_FEED}>Jobs</Link>
			      </NavItem>
			      <NavItem>
			      	<Link className='job-text signup-link' to={routes.COLLAB_CORNER}>Collab Corner</Link>
			      </NavItem>
			      <NavItem>
			      	<RECRUITERButton />
			      </NavItem>
			      <NavItem>
			      	<RECRUITERManageJobsButton />
			      </NavItem>
			      <NavItem>
			      	<RECRUITERSignup />
			      </NavItem>
			      <LogoutButton />
			    </Nav>
			    <Nav>
			    	<NavItem>
			    		<Link to={routes.ACCOUNT} className='btn job-text yellow-button'><span className='glyphicon glyphicon-stats'></span> &nbsp;&nbsp; Account</Link>
			    	</NavItem>
			    	<NavItem>
			    		<ProfileButtonToggle />
			    	</NavItem>
			    </Nav>
			    
			    <LoggedInAs />
			  </Navbar.Collapse>
			</Navbar>

			:

			<Navbar inverse collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <Link to="/" className="navbar-brand">HireMoreDevs</Link>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav pullRight>
			      <NavItem eventKey={2} to='/login'>
			        <Link to='/login' className='login-link job-text'> Login</Link>
			      </NavItem>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar> 

			}
			</div>
		);
	}			

}




export default Header;