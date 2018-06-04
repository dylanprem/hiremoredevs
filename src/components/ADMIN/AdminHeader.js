import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { withRouter, Link } from 'react-router-dom';



class AdminHeader extends Component {
	constructor(props){
	super(props);
	this.state = {
		authUser: null,
		isAdmin:false
		}
	}


	componentDidMount() {


	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("ADMIN").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isAdmin:true});
				    } else {
				    	this.setState({isAdmin:false});
				    }
				});
	      } 
    	});	
	}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<div>
				{this.state.isAdmin ?
				<div>
					<nav className="navbar navbar-inverse">
					  <div className="container-fluid">
					    <div className="navbar-header">
					      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#adminNavBar">
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>                        
					      </button>
					      <Link className='signup-link job-text navbar-brand' to="/">Admin Menu</Link>
					    </div>
					    <div className="collapse navbar-collapse" id="adminNavBar">
					        <Link to={routes.ADMIN_APPROVE_JOB} className='job-text btn btn-info navbar-btn'>JOB POST REQUESTS</Link>
					        <Link to={routes.RECRUITER_SIGNUP_REQUESTS} className='job-text btn btn-info navbar-btn'>RECRUITER SIGNUP REQUESTS</Link>
					    </div>
					  </div>
					</nav>
				</div>
				: 
				null }
			</div>
			: null }
			</div>
		);
	}
}

export default withRouter(AdminHeader);