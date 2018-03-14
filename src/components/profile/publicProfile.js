import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class publicProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			
		}
	}


	componentDidMount(){
		const user = firebase.auth().currentUser;		
		const profilesRef = firebase.database().ref('Profiles' );
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
				
				:
				null
			}
			</div>
		);
	}
}

export default publicProfile;