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

const Header = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
   
  </div>

Header.contextTypes = {
  authUser: PropTypes.object,
};



const NavigationAuth = () =>
			<div>
				<Navbar inverse collapseOnSelect>
				  <Navbar.Header>

				    <Navbar.Brand>
				      <Link to="/latest" className="navbar-brand">HireMoreDevs</Link>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>

				    
				    <Nav pullRight>
				      <NavItem>
				      	<Link className='signup-link' to={routes.VIEW_PROFILE}>About Me</Link>
				      </NavItem>
				      <NavItem eventKey={1}>
				        <Link to='/post-job' className='signup-link'> Post Job Ad</Link>
				      </NavItem>
				      <NavItem eventKey={1} onClick={auth.doSignOut}>
				        <button className='btn yellow-button logged-in-as'>Logout</button>
				      </NavItem>
				    </Nav>
				    <ProfileButtonToggle />
				    <LoggedInAs />
				  </Navbar.Collapse>
				</Navbar>
			</div>

const NavigationNonAuth = () =>	
			<div>
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
				        <Link to='/login' className='login-link'> Login</Link>
				      </NavItem>
				    </Nav>
				  </Navbar.Collapse>
				</Navbar> 
			</div>





export default Header;