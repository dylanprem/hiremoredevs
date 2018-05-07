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
				  displayName: "New User",
				  photoURL: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png"
				});
		    	const profilesRef = firebase.database().ref('Profiles');
				const Profiles  = {
					uid: this.state.authUser.uid,
					name: this.state.authUser.displayName,
					profilePicture: "https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-256.png",
					email: this.state.authUser.email
				}
				profilesRef.push(Profiles);
				this.props.history.push(routes.CURRENT_FEED);
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
									<Link id='edit-button' className='btn yellow-button job-text' to={`/edit/${profile.id}`}>Edit Profile</Link>
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