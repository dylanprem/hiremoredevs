import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
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
				firebase.auth().currentUser.updateProfile({
				  displayName: "user" + Date.now(),
				  photoURL: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png"
				});
		    	const profilesRef = firebase.database().ref('Profiles');
				const Profiles  = {
					uid: this.state.authUser.uid,
					name: "user" + Date.now(),
					profilePicture: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png",
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
				<div>
					{this.state.Profiles.map((profile) => {
						return(
						<div key={profile.id}>
								{profile.uid === this.state.authUser.uid ?
									<div>
										<Link id='edit-button' className='btn yellow-button job-text hidden-sm hidden-xs' to={`/edit/${profile.id}`}><span className='glyphicon glyphicon-pencil'></span>&nbsp;&nbsp;Edit Profile</Link>
										<Link id='edit-button' className='signup-link job-text visible-xs visible-sm' to={`/edit/${profile.id}`}>Edit Profile</Link>
									</div>
									: 
									null
								}
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

export default withRouter(ProfileButtonToggle);