import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';



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
				    <ul className='nav navbar-nav navbar-right'>	
				    	<li><Link to='/pw-change'><span className='glyphicon glyphicon-cog'></span></Link></li>
				    	<li><Link to='/post-job-seeker'>POST</Link></li>
				    </ul>
					<button className='btn btn-danger navbar-btn btn-sm navbar-right' type="button" onClick={auth.doSignOut}><span className='glyphicon glyphicon-log-out'></span>  Logout</button>
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