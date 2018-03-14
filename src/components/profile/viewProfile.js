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
			profileInfo:[],
		}
	}


	componentDidMount(){


		const user = firebase.auth().currentUser;		
		const profilesRef = firebase.database().ref('Profiles/' + this.state.uid + '/profileInfo/' );
		profilesRef.once('value', (snapshot) => {
	    let profileInfo = snapshot.val();
	    let newState = [];
	    for (let profile in profileInfo){
	      newState.push({
	        id: profileInfo[profile].id,
	        about: profileInfo[profile].about,
	        frameworkOne:profileInfo[profile].frameworkOne,
			frameworkTwo:profileInfo[profile].frameworkTwo,
			frameworkThree:profileInfo[profile].frameworkThree,
			projectName:profileInfo[profile].projectName,
			projectLink:profileInfo[profile].projectLink,
			projectInfo:profileInfo[profile].projectInfo,
			uid:profileInfo[profile].uid,
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
					{this.state.profileInfo.map((profile) => {
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