import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class EditInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			updatedDisplayName:'',
			updatedPhotoURL:'',
			updatedEmail:'',
			Profiles:[],
			currentProfile: this.props.match.params.editInfo
		}
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	handleSubmit(e) {
	    e.preventDefault();
	    firebase.auth().currentUser.updateProfile({
		  displayName: this.state.updatedDisplayName,
		  photoURL: this.state.updatedPhotoURL
		}).then(function() {
		  console.log('Profile updated');
		}).catch(function(error) {
		  console.log('Profile did not update');
		});

		const profilesRef = firebase.database().ref('Profiles/' + this.state.currentProfile);
		const Profiles = {
			name: this.state.updatedDisplayName,
			profilePicture: this.state.updatedPhotoURL
		}


		profilesRef.update(Profiles);
		this.setState({
			name: '',
			profilePicture:''
		});
}


	componentDidMount(){		
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
				<div className='col-md-4 col-md-offset-4 text-center job-text'>
					<div className='form-group'>
						<label>Full Name</label>
						<input type='text' name='updatedDisplayName' value={this.state.updatedDisplayName} onChange={this.handleChange} className='form-control' placeholder='Your Name' />
					</div>

					<div className='form-group'>
						<label>Photo URL</label>
						<input type='text' name='updatedPhotoURL' value={this.state.updatedPhotoURL} onChange={this.handleChange} className='form-control' placeholder='https://pathToPhoto.com' />
					</div>

					<input type='submit' className='btn yellow-button' value='Update' onClick={this.handleSubmit} />
				</div>

				:
				null
			}
			</div>
		);
	}
}

export default EditInfo;