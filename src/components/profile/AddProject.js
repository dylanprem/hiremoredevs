import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignInForm from '../Auth/login';

class AddProject extends Component{
	constructor(props){
		super(props);
		this.state = {
			authUser: null,
			projectName:'',
			projectLink:'',
			projectInfo:'',
			Projects:[]
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
	  const projectsRef = firebase.database().ref('Projects');
	  const Projects = {
	  		uid: this.state.authUser.uid,
			projectName: this.state.projectName,
			projectLink: this.state.projectLink,
			projectInfo: this.state.projectInfo,
	  }


	  projectsRef.push(Projects);
	  this.setState({
			projectName:'',
			projectLink:'',
			projectInfo:'',
	  });
	  window.location.reload();
	}

	componentDidMount(){	
	  firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	      } 
    	});	
	}

	render(){
		return(
			<div className='row'>
				{this.state.authUser ?
				<div className='col-md-4 col-md-offset-4 text-center'>
					<h3>Add a project</h3>
					<div className='job-text'>
						<input type='text' className='form-control' placeholder='Project Name' name='projectName' onChange={this.handleChange} value={this.state.projectName} />
						<br />
						<input type='text' className='form-control' placeholder='e.g. http://myapp.com' name='projectLink' onChange={this.handleChange} value={this.state.projectLink} />
						<br />
						<textarea type='text' className='form-control' rows='5' placeholder='Brief description of this project' name='projectInfo' onChange={this.handleChange} value={this.state.projectInfo} />
						<br />

						<div className='col-md-12'>
							<button className='btn yellow-button' onClick={this.handleSubmit}>Add Project</button>
						</div>
					</div>
				</div>
				:
				<SignInForm />
				}
			</div>
		);
	}
}


export default AddProject;



				
