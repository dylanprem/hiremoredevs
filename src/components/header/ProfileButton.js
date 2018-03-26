import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import withAuthorization from '../withAuthorization';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';


class ProfileButtonToggle extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			Profiles:[],
			hasProfile: false
		}
	}


	

	componentDidMount(){
		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        console.log(this.state.authUser.uid);
	        
			} 
    	});

    	const profilesRef = firebase.database().ref('Profiles');
	        profilesRef.once('value', (snapshot) => {		
			    let Profiles = snapshot.val();
			    console.log(snapshot.val());
			    console.log(this.state.Profiles);
			    const checkUID = snapshot.val().hasOwnProperty("uid");
			    console.log(checkUID);
			    let newState = [];
			    console.log(newState);
			    for (let profile in Profiles){
			      newState.push({
			        id: profile,
					uid:Profiles[profile].uid,
			      });
			      console.log(this.state.authUser.uid === Profiles[profile].uid);
			    }
			    this.setState({
			      Profiles: newState
			    });
			  });	
	}
	

	render() {
		return (
			<div>
			{this.state.authUser ?
				<div>
					<div>
						{this.state.Profiles.map((profile) => {
							return(
							<div key={profile.id}>

									{profile.uid === this.state.authUser.uid ?
										<Link id='edit-button' className='btn yellow-button job-text' to={`/edit/${profile.id}`}>Edit Profile</Link>
										:
										null
									}
								
							</div>
						);
						})}
					</div>
					<div>
						
							{typeof this.state.Profiles.uid !== String ? 
								<Link id='edit-button' className='btn yellow-button job-text' to={routes.CREATE_PROFILE}>Create Profile</Link>
								:
								null
							}
						
					</div>
				</div>
				:
				null
			}
			</div>

		);
	}
}

export default ProfileButtonToggle;