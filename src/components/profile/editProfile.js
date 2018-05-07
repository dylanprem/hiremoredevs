import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SignInForm from '../Auth/login';

class editProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			Profiles:[],
			currentProfile: props.match.params.editProfile,
			uid:'',
			about:'',
			email:'',
			displayName:'',
			profilePicture:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			error: null,
		}
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
	}

	deleteProfile(){
		const profileToDelete = firebase.database().ref('Profiles/' + this.state.currentProfile);
		profileToDelete.remove()
		.then(() => {
			const user = firebase.auth().currentUser;
			user.delete();
		})
		.then(() => {
			firebase.auth().signOut();
			this.props.history.push(routes.LANDING);
		})
		.then(() => {
			window.location.reload();
		})
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	handleSubmit(e) {
	   firebase.auth().currentUser.updateProfile({
		  displayName: this.name.value,
		  photoURL: this.profilePicture.value
		}).then(function() {
		  console.log('Profile updated');
		}).catch(function(error) {
		  console.log('Profile did not update');
		});
	  const profilesRef = firebase.database().ref('Profiles/' + this.state.currentProfile);
	  const Profiles = {
	  		uid: this.state.authUser.uid,
	  		email: this.state.authUser.email,
	  		name: this.name.value,
	  		profilePicture: this.profilePicture.value,
	    	about: this.about.value,
			frameworkOne: this.frameworkOne.value,
			frameworkTwo: this.frameworkTwo.value,
			frameworkThree: this.frameworkThree.value,
	  }


	  profilesRef.update(Profiles);
	  this.setState({
			about:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			name: '',
			profilePicture:''
	  });
	  this.props.history.push(routes.VIEW_PROFILE);
	}


	componentDidMount(){	
	  const profilesRef = firebase.database().ref('Profiles/' + this.state.currentProfile);
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	      newState.push({
	        id: this.state.currentProfile,
	        about: snapshot.val().about,
	        frameworkOne:snapshot.val().frameworkOne,
			frameworkTwo:snapshot.val().frameworkTwo,
			frameworkThree:snapshot.val().frameworkThree,
			uid:snapshot.val().uid,
			name: snapshot.val().name,
			profilePicture: snapshot.val().profilePicture,
	      });
	    
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
					{this.state.Profiles.map((profile) => {return(
					<div>
					<img style={{with:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
					<p className='job-text'>{this.state.authUser.displayName}</p>
					<p className='job-text'>{this.state.authUser.email}</p>

					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<label>Full Name</label>
						<input type='text' name='name' defaultValue={profile.name} ref={(name) => this.name = name} onChange={this.handleChange} className='form-control' placeholder='Your Name' />
					</div>

					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<label>Photo URL</label>
						<input type='text' name='profilePicture' defaultValue={profile.profilePicture} ref={(profilePicture) => this.profilePicture = profilePicture} onChange={this.handleChange} className='form-control' placeholder='https://pathToPhoto.com' />
					</div>
					
					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<h3>About Me</h3>
						<textarea type='text' className='form-control' rows='5' name='about' onChange={this.handleChange} ref={(about) => this.about = about}  defaultValue={profile.about} placeholder='I am awesome!' required />
					</div>

					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<h3>My top three frameworks</h3>
						<input type='text' className='form-control' name='frameworkOne' onChange={this.handleChange} defaultValue={profile.frameworkOne} ref={(frameworkOne) => this.frameworkOne = frameworkOne} placeholder='React' required />
						<br />
						<input type='text' className='form-control' name='frameworkTwo' onChange={this.handleChange} defaultValue={profile.frameworkTwo} ref={(frameworkTwo) => this.frameworkTwo = frameworkTwo} placeholder='Javascript' required />
						<br />
						<input type='text' className='form-control' name='frameworkThree' onChange={this.handleChange} defaultValue={profile.frameworkThree} ref={(frameworkThree) => this.frameworkThree = frameworkThree} placeholder='Firebase' required />
					</div>
					
					<div className='col-md-12'>
						<button className='btn yellow-button job-text' onClick={this.handleSubmit}>Update profile</button>
					</div>
					<div className='col-md-12'>
						<button className='btn btn-danger job-text' onClick={this.deleteProfile}>Delete profile</button>
					</div>
					</div>
					);})}
				</div>

				:
				null
			}
			</div>
		);
	}
}

export default withRouter(editProfile);