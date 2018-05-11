import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { withRouter, history, Link, BrowserRouter as BrowserHistory, Route } from 'react-router-dom';
import * as routes  from '../../constants/routes';
import SignInForm from '../Auth/login';

class RecruiterSignupRequests extends Component {
	constructor(props){
	super(props);
	this.state = {
		authUser: null,
		ADMIN: [],
		Profiles:[],
		RECRUITERSignupRequests:[],
		isAdmin: false

		}
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(id) {
	    const reqToDeleteref = firebase.database().ref(`RECRUITERSignupRequests/${id}`);
	    reqToDeleteref.remove();
	    window.location.reload();
	}



	componentDidMount() {


	  const reqref = firebase.database().ref('RECRUITERSignupRequests');
	  reqref.on('value', (snapshot) => {
	  	let RECRUITERSignupRequests = snapshot.val();
	  	
	  	let newState = [];
	  	for (let req in RECRUITERSignupRequests){
	      newState.push({
	      	id: req,
			uid: RECRUITERSignupRequests[req].uid,
			companyName: RECRUITERSignupRequests[req].companyName,
			linkedin: RECRUITERSignupRequests[req].linkedin
	      });
	    }
	    this.setState({
	      RECRUITERSignupRequests: newState
	    });
	  });

	  	const profilesRef = firebase.database().ref('Profiles');
	    profilesRef.once('value', (snapshot) => {		
		    let Profiles = snapshot.val();
		    let newState = [];
		    for (let profile in Profiles){
		      newState.push({
		        id: profile,
				uid:Profiles[profile].uid,
				name: Profiles[profile].name,
				profilePicture: Profiles[profile].profilePicture

		      });

		    }
		    this.setState({
		      Profiles: newState
		    });
		  });

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
				<div className="col-md-12 jobs-container" >
					{this.state.isAdmin ? 
						<div>
							<h1 className="text-center job-text">RECRUITER REGISTRATION REQUESTS</h1>
							<table class='table job-text'>
								<thead>
									<tr>
										<th></th>
										<th>Name</th>
										<th>Info</th>
										<th>LinkedIn</th>
									</tr>
								</thead>
								
								<tbody>
									{this.state.RECRUITERSignupRequests.map((req) => {
									return(
									<tr key={req.id}>
										
										<td>
										{this.state.Profiles.map((profile) => { return(
											<div key={profile.id}>
											{profile.uid === req.uid ? <img src={profile.profilePicture} className='profile-pic img-responsive center-block img-circle' style={{width:50, height:50}} /> : null}
											</div>
										);})}
										</td>
										

										
										<td>
										{this.state.Profiles.map((profile) => { return(
											<div key={profile.id}>
											{profile.uid === req.uid ? <p>{profile.name}</p> : null }
											</div>
										);})}
										</td>
										
										
										<td>
										{this.state.Profiles.map((profile) => { return(
											<div key={profile.id}>
											{profile.uid === req.uid ? <Link to={`/admin-view-recruiter-request/${req.id}`} className='btn yellow-button btn-sm'>View</Link> : null }
											</div>
										);})}
										</td>
										
										
										<td>{this.state.Profiles.map((profile) => { return(
											<div key={profile.id}>
											{profile.uid === req.uid ? <Link to={req.linkedin} className='btn btn-primary btn-sm'>LinkedIn</Link> : null }
											</div>
										);})}
										</td>
										
										<td><button className='btn btn-danger job-text btn-block' onClick={() => this.removeItem(req.id)}>Deny</button></td>
									</tr>
										);
									})}
								</tbody>
								
							</table>
						</div> 
					: <h1 className="job-text alert alert-danger">OOPS! YOU DO NOT HAVE ACCESS TO THIS PAGE.</h1> }
				</div>
			</div>
			: null }
			</div>
		);
	}
}

export default RecruiterSignupRequests;