import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
	  this.props.history.push(routes.VIEW_PROFILE);
	  const profilesRef = firebase.database().ref('Profiles/' + this.state.currentProfile);
	  const Profiles = {
	  		uid: this.state.authUser.uid,
	  		email: this.state.authUser.email,
	  		name: this.state.authUser.displayName,
	  		profilePicture: this.state.authUser.photoURL,
	    	about: this.state.about,
			frameworkOne: this.state.frameworkOne,
			frameworkTwo: this.state.frameworkTwo,
			frameworkThree: this.state.frameworkThree,
	  }


	  profilesRef.update(Profiles);
	  this.setState({
			about:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
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
				<div className='col-md-12 text-center'>
					<img style={{with:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
					<p className='job-text'>{this.state.authUser.displayName}</p>
					<p className='job-text'>{this.state.authUser.email}</p>
					
					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<h3>About Me</h3>
						<textarea type='text' className='form-control' rows='5' name='about' onChange={this.handleChange} value={this.state.about} placeholder='I am awesome!' required />
					</div>

					<div className='form-group col-md-6 col-md-offset-3 job-text'>
						<h3>My top three frameworks</h3>
						<input type='text' className='form-control' name='frameworkOne' onChange={this.handleChange} value={this.state.frameworkOne} placeholder='React' required />
						<br />
						<input type='text' className='form-control' name='frameworkTwo' onChange={this.handleChange} value={this.state.frameworkTwo} placeholder='Javascript' required />
						<br />
						<input type='text' className='form-control' name='frameworkThree' onChange={this.handleChange} value={this.state.frameworkThree} placeholder='Firebase' required />
					</div>
					
					<div className='col-md-12'>
						<button className='btn yellow-button' onClick={this.handleSubmit}>Update profile</button>
					</div>
				</div>

				:
				null
			}
			</div>
		);
	}
}

export default editProfile;