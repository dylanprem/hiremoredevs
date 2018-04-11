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
import AdminButton from '../ADMIN/AdminButton';


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
			
				<Navbar inverse collapseOnSelect>
				  <Navbar.Header>

				    <Navbar.Brand>
				      <Link to="/" className="navbar-brand logo">HireMoreDevs</Link>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>

				    <AdminButton />
				    <Nav pullRight>
				      <NavItem>
				      	<Link className='signup-link job-text' to={routes.CURRENT_FEED}>Jobs</Link>
				      </NavItem>
				      <NavItem eventKey={1}>
				        <Link to='/post-job' className='signup-link job-text'> Post Job Ad</Link>
				      </NavItem>
				      
				      <NavItem>
				      	<Link className='job-text signup-link' to={routes.COLLAB_CORNER}>Collab Corner</Link>
				      </NavItem>
				      <NavItem eventKey={2} onClick={auth.doSignOut}>
				        <button className='btn yellow-button logged-in-as'>Logout</button>
				      </NavItem>
				    </Nav>
				    <ProfileButtonToggle />
				    <LoggedInAs />
				  </Navbar.Collapse>
				</Navbar>
			

const NavigationNonAuth = () =>	
			
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
			





export default Header;