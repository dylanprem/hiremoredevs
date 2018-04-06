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

	componentDidUpdate() {
		firebase.database().ref("Profiles").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
		    const userData = snapshot.val();
		    if (userData){
		      console.log("exists!");
		    } else {
		    	const profilesRef = firebase.database().ref('Profiles');
				const Profiles  = {
					uid: this.state.authUser.uid,
					profilePicture: this.state.authUser.photoURL,
					email: this.state.authUser.email
				}
				profilesRef.push(Profiles);
				window.location.reload();
			}
		});
	}
	

	render() {
		return (
			<div>
			{this.state.authUser ?
				<Nav>
					{this.state.Profiles.map((profile) => {
						return(
						<NavItem key={profile.id}>
								{profile.uid === this.state.authUser.uid ?
									<Link id='edit-button' className='btn yellow-button job-text' to={`/edit/${profile.id}`}>Edit Profile</Link>
									: 
									null
								}
						</NavItem>
					);
					})}
				</Nav>
				:
				null
			}
			</div>

		);
	}
}

export default ProfileButtonToggle;