import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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

		}
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(id) {
	    const reqToDeleteref = firebase.database().ref(`RECRUITERSignupRequests/${id}`);
	    reqToDeleteref.remove();
	    window.location.reload();
	}



	componentDidMount() {

	  const ADMINref = firebase.database().ref('ADMIN');
	  ADMINref.on('value', (snapshot) => {
	  	let ADMIN = snapshot.val();
	  	console.log(snapshot.val());
	  	let newState = [];
	  	for (let admins in ADMIN){
	      newState.push({
	      	id: admins,
			uid: ADMIN[admins].uid,
	      });
	    }
	    this.setState({
	      ADMIN: newState
	    });
	  });

	  const reqref = firebase.database().ref('RECRUITERSignupRequests');
	  reqref.on('value', (snapshot) => {
	  	let RECRUITERSignupRequests = snapshot.val();
	  	console.log(snapshot.val());
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
	      } 
    	});	
	}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<div>
			{this.state.ADMIN.map((admins) => {
			return(
				<div key={admins.id}>
					{admins.uid === this.state.authUser.uid ? 
						<div className='table-responsive'>
							<table class='table table-striped job-text'>
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
											{profile.uid === req.uid ? <img src={profile.profilePicture} className='img-responsive center-block img-circle' style={{width:50, height:50}} /> : null}
											</div>
										);})}
										</td>

										<td>
										{this.state.Profiles.map((profile) => { return(
											<div key={profile.id}>
											{profile.uid === req.uid ? profile.name : null }
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
										<td>
										{this.state.Profiles.map((profile) => { return(
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
					: null }
				</div>
					);
		        })}
			</div>
			: <SignInForm /> }
			</div>
		);
	}
}

export default RecruiterSignupRequests;