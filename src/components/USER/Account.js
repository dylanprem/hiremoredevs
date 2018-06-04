import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import CollabsPosted from './CollabsPosted';
import JobsOfInterest from './JobsOfInterest';
import ViewProfile from '../profile/viewProfile';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Account extends Component {
	constructor(props){
		super(props);
		this.state = {
	    	authUser: null,
	    	newPassword:'',
	    	isSignedInWithGoogle: '' ,
	    	disabledButton: false  ,
	    	isEditingProfile: false,
	    	currentProfile: props.match.params.profileId,
	    	about:'',
			email:'',
			displayName:'',
			profilePicture:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			error: null,
			authUsersUID:'',
			Collabs:[],
			postsFromUsers:[],
			Profiles:[],
			dataDeleted: false
	    	
		}
		this.handleChange = this.handleChange.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.deleteProfile = this.deleteProfile.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);	
		this.isEditing = this.isEditing.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	  this.setState({isEditing:false});
	}

	isEditing(){
		this.setState({isEditing:true});
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState({
	      [name]: value
	    });
	  }

	deleteProfile(){
		const rootRef1 = firebase.database().ref('Collabs');
		const collabsToDelete = firebase.database().ref('Collabs').orderByChild("uid").equalTo(this.state.authUsersUID);
		collabsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef1.update(updates);
		});
		const rootRef = firebase.database().ref('Comments');
		const commentsToDelete = firebase.database().ref('Comments').orderByChild("uid").equalTo(this.state.authUsersUID);
		commentsToDelete.once("value", (snapshot) => {
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef.update(updates);
		});
		const rootRef2 = firebase.database().ref('postsFromUsers');
		const postsToDelete = firebase.database().ref('postsFromUsers').orderByChild("uid").equalTo(this.state.authUsersUID);
		postsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef2.update(updates);
		});	
		const rootRef3 = firebase.database().ref('JobPosts');
		const jobsToDelete = firebase.database().ref('JobPosts').orderByChild("uid").equalTo(this.state.authUsersUID);
		jobsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef3.update(updates);
		});	
		const rootRef4 = firebase.database().ref('projects');
		const projectsToDelete = firebase.database().ref('projects').orderByChild("uid").equalTo(this.state.authUsersUID);
		projectsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef4.update(updates);
		})
		const rootRef5 = firebase.database().ref('RECRUITERSignupRequests');
		const recReqsToDelete = firebase.database().ref('RECRUITERSignupRequests').orderByChild("uid").equalTo(this.state.authUsersUID);
		recReqsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef5.update(updates);
		})
		const rootRef6 = firebase.database().ref('JobPostRequests');
		const jobReqsToDelete = firebase.database().ref('JobPostRequests').orderByChild("uid").equalTo(this.state.authUsersUID);
		jobReqsToDelete.once("value", (snapshot) =>{
			const updates = {};
			snapshot.forEach((childSnapshot) => {
				updates[childSnapshot.key] = null;
			});
			rootRef6.update(updates);
		})
		
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

	updatePassword(){
		const newPassword = this.state.newPassword;
		auth.currentUser.updatePassword(newPassword).then(function(){
			document.getElementById("success-msg").innerHTML = "Password successfully updated!"
		}).catch(error => {
        this.setState(byPropKey('error', error));
    	});
	}


	componentDidMount() {
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
	        	this.setState({authUsersUID: this.state.authUser.uid});
		        if(this.state.authUser.providerData[0].providerId === 'google.com'){
		        	this.setState({isSignedInWithGoogle: true});
		        } else {
		        	this.setState({isSignedInWithGoogle:false});
		        }
	    	}
    	});

	}

	componentDidUpdate(){
		firebase.database().ref("Profiles").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
		    const userData = snapshot.val();
		    if (userData){
		      console.log("loaded");
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
					email: this.state.authUser.email,
 
				}
				profilesRef.push(Profiles);
				window.location.reload();
			}
		});
	}


	render(){
		return(
			
			<div className='row'>

				{this.state.authUser ?
					<div>
						{this.state.isEditing ?
						<div className='col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1'>
							{this.state.Profiles.map((profile) => { return (
							<div key={profile.id}>
								{profile.uid === this.state.authUser.uid ?
								<div className='col-md-12 text-center'>
									<img style={{width:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
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
									
									<div className='col-md-12 text-center'>
										<button className='btn yellow-button job-text' onClick={this.handleSubmit}>Update profile</button>
									</div>
									
								</div>
								:
								<div className='col-md-6 col-md-offset-3'>
									<h1 className='alert alert-danger job-text text-center'>Hey man, why are you trying to edit someone elses profile? That's not cool bro.</h1>
								</div> }
							</div>
							);})}
						</div> 
						:
						<div>
							<div className='col-md-4 col-md-offset-4 text-center profile-container'><button className='btn yellow-button job-text' onClick={this.isEditing}><span className='glyphicon glyphicon-pencil'></span> Edit Profile</button></div>
							<ViewProfile />
						
						</div>
						}
						<div className='col-md-12'>
					        {this.state.isSignedInWithGoogle ? null :
							<div className='col-md-4'>
								<h1 className='job-text'>Update Password</h1>
								<input type='password' className='form-control' name='newPassword' value={this.state.newPassword} onChange={this.handleChange} />
								<br />
								<div className='text-center'>
									<button className='yellow-button btn job-text' onClick={this.updatePassword}>Update Password</button>
								</div>
								<div className='col-md-12 text-center'>
						          { this.state.error && <p className='text-danger job-text'>{this.state.error.message}</p> }
						          <p id="success-msg" className='job-text'></p>
						        </div>
							</div>
							 }
						</div>

						<div className='col-md-12'>
							<div className='col-md-4'>
								<h1 className='job-text'>Delete Account</h1>
								<div className='checkbox'>
									<label className='job-text'><input type="checkbox" checked={this.state.disabledButton} onChange={this.handleInputChange} name='disabledButton'  />I want to delete my account</label>
								</div>

								<div className='col-md-4'>
									<button className={this.state.disabledButton ? 'btn btn-danger job-text' : 'btn btn-danger job-text disabled'} onClick={this.deleteProfile}>Delete Account</button>
								</div>
							</div>
						</div>
						<div className='col-md-12'>
					    	<div className='col-md-6'>
					    		<CollabsPosted />
					    	</div>
					    	<div className='col-md-6'>
					    		<JobsOfInterest />
					    	</div>
				    	</div>

			    	</div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(Account);


