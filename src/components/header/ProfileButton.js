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
			Profiles:[]

		}
	}

	componentDidMount(){
	  const profilesRef = firebase.database().ref('Profiles');
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    for (let profile in Profiles){
	      newState.push({
	        id: profile,
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
			<div>
			{this.state.authUser ?
				<div>
					<div>
						{this.state.Profiles.map((profile) => {
							return(
							<div key={profile.id}>
								<Nav>
									<NavItem>
									{profile.uid === this.state.authUser.uid ?
										<Link className='btn yellow-button job-text' to={`/edit/${profile.id}`}>Edit Profile</Link>
										: 
										null
										}
									</NavItem>
								</Nav>
							</div>
						);
						})}
					</div>
					<div>
						{this.state.Profiles.map((profile) => {
							return(
							<div>
								<Nav>
									<NavItem>
									{profile.uid === null && profile.uid !== this.state.authUser.uid ?
										<Link className='btn yellow-button job-text' to={routes.CREATE_PROFILE}>Create Profile</Link>
										: 
										null
										}
									</NavItem>
								</Nav>
							</div>
						);
						})}
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