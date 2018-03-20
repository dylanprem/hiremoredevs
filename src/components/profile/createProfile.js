import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

class createProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			uid:'',
			about:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			projectName:'',
			projectLink:'',
			projectInfo:'',
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
	  this.props.history.push(routes.CURRENT_FEED);
	  window.location.reload();
	  const profilesRef = firebase.database().ref('Profiles');
	  const Profiles = {
	  		uid: this.state.authUser.uid,
	  		email: this.state.authUser.email,
	  		name: this.state.authUser.displayName,
	    	about: this.state.about,
			frameworkOne: this.state.frameworkOne,
			frameworkTwo: this.state.frameworkTwo,
			frameworkThree: this.state.frameworkThree,
			projectName: this.state.projectName,
			projectLink: this.state.projectLink,
			projectInfo: this.state.projectInfo,
	  }


	  profilesRef.push(Profiles);
	  this.setState({
			about:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			projectName:'',
			projectLink:'',
			projectInfo:'',
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
					
					<div className='form-group col-md-6 col-md-offset-3'>
						<h3>About Me</h3>
						<textarea type='text' className='form-control' rows='5' name='about' onChange={this.handleChange} value={this.state.about} />
					</div>

					<div className='form-group col-md-6 col-md-offset-3'>
						<h3>My top three frameworks</h3>
						<input type='text' className='form-control' name='frameworkOne' onChange={this.handleChange} value={this.state.frameworkOne} />
						<br />
						<input type='text' className='form-control' name='frameworkTwo' onChange={this.handleChange} value={this.state.frameworkTwo} />
						<br />
						<input type='text' className='form-control' name='frameworkThree' onChange={this.handleChange} value={this.state.frameworkThree} />
					</div>
					
					<div className='form-group col-md-6 col-md-offset-3'>
					<h3>My Best Work</h3>
					<p>Please include a link to your best project.</p>
						<input type='text' className='form-control' placeholder='Project Name' name='projectName' onChange={this.handleChange} value={this.state.projectName} />
						<br />
						<input type='text' className='form-control' placeholder='e.g. http://myapp.com' name='projectLink' onChange={this.handleChange} value={this.state.projectLink} />
						<br />
						<textarea type='text' className='form-control' rows='5' placeholder='Brief description of this project' name='projectInfo' onChange={this.handleChange} value={this.state.projectInfo} />
						<br />					
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

export default createProfile;