import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import './style.css';
import * as routes from '../../constants/routes';
import RECRUITERButton from '../RECRUITER/RECRUITERButton';
import RECRUITERManageJobsButton from '../RECRUITER/RECRUITERManageJobsButton';
import RECRUITERSignup from '../RECRUITER/RECRUITERSignup';
import LogoutButton from '../Auth/Logout';
import AccountButton from './AccountButton';


class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			onBottom: false
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
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>                        
			      </button>
			      <Link className='signup-link job-text navbar-brand' to="/">HireMoreDevs</Link>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
			        <li><Link className='signup-link job-text' to={routes.CURRENT_FEED}>Jobs</Link></li>
			        <li><Link className='job-text signup-link' to={routes.COLLAB_CORNER}>Collab Corner</Link></li>
			      </ul>

			      <RECRUITERButton />
		          <RECRUITERManageJobsButton />
		          <RECRUITERSignup />
		          <LogoutButton />
		          <AccountButton />

			    </div>
			 
			  </div>
			</nav>
			

			:

			null
			 

			}
			</div>
		);
	}			

}




export default Header;