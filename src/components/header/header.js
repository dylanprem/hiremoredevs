import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';


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
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <Link to="/latest" className="navbar-brand">HireMoreDevs</Link>
				    </div>
				    <button className='btn btn-danger navbar-btn btn-sm' type="button" onClick={auth.doSignOut}><span className='glyphicon glyphicon-log-out'></span>  Logout</button>
				    <ul className='nav navbar-nav navbar-right'>
				    	<li><Link to='/post-job'><button className='btn btn-default btn-sm'><span className='glyphicon glyphicon-list-alt'></span> Post Job Ad</button></Link></li>
							
				    	<li><Link to='/pw-change'><button className='btn btn-info btn-sm'><span className='glyphicon glyphicon-cog'></span> Settings</button></Link></li>
				    </ul>

				  </div>
				</nav> 
			</div>

const NavigationNonAuth = () =>	
			<div>
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <Link to="/" className="navbar-brand">HireMoreDevs</Link>
				    </div>
				    <ul className="nav navbar-nav navbar-right">
				      <li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
				      <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
				    </ul>
				  </div>
				</nav> 
			</div>

export default Header;