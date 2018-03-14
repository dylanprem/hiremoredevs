import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class viewProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			Profiles:[],
		}
	}


	componentDidMount(){


		const user = firebase.auth().currentUser;		
		const profilesRef = firebase.database().ref('Profiles/' );
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    for (let profile in Profiles){
	      newState.push({
	        id: profile,
	        about: Profiles[profile].about,
	        frameworkOne:Profiles[profile].frameworkOne,
			frameworkTwo:Profiles[profile].frameworkTwo,
			frameworkThree:Profiles[profile].frameworkThree,
			projectName:Profiles[profile].projectName,
			projectLink:Profiles[profile].projectLink,
			projectInfo:Profiles[profile].projectInfo,
			uid:Profiles[profile].uid,
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
	

	render() {
		return (
			<div className='row profile-container'>
			{this.state.authUser ?
				<div className='col-md-12 text-center'>
					<img style={{with:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
					<p className='job-text'>{this.state.authUser.displayName}</p>
					<p className='job-text'>{this.state.authUser.email}</p>
					{this.state.Profiles.map((profile) => {
						return(
					<div key={profile.id}>
						{profile.uid === this.state.authUser.uid ?
						<div>
							<h3>About Me</h3>
							<p className='job-text'>{profile.about}</p>
							<h3>My top three</h3>
							<p className='job-text'>{profile.frameworkOne}</p>
							<p className='job-text'>{profile.frameworkTwo}</p>
							<p className='job-text'>{profile.frameworkThree}</p>
							
							<h3>My Best Work</h3>
							<h4>{profile.projectName}</h4>
							<p className='job-text'>{profile.projectLink}</p>
							<p className='job-text'>{profile.projectInfo}</p>
							<Link className='btn yellow-button' to={`profile/${profile.id}`} >Edit Profile</Link>
						</div>
						:
						null}
					</div>
					);
					})}

				</div>

				:
				null
			}
			</div>
		);
	}
}

export default viewProfile;