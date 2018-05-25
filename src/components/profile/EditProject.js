import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignInForm from '../Auth/login';

class EditProject extends Component{
	constructor(props){
		super(props);
		this.state = {
			authUser: null,
			projectName:'',
			projectLink:'',
			projectInfo:'',
			Projects:[],
			currentProject: props.match.params.currentProject,
			currentProfile: props.match.params.currentProfile,
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
	  const projectsRef = firebase.database().ref('Projects/'+ this.state.currentProject);
	  const Projects = {
			projectName: this.projectName.value,
			projectLink: this.projectLink.value,
			projectInfo: this.projectInfo.value,
	  }
	  projectsRef.update(Projects);
	  this.setState({
			projectName:'',
			projectLink:'',
			projectInfo:'',
	  });
	  this.props.history.push(`/myAccount/${this.state.currentProfile}`);
	}

	componentDidMount(){
	  const projectsRef = firebase.database().ref('Projects/'+this.state.currentProject);
		projectsRef.once('value', (snapshot) => {
	    let Projects = snapshot.val();
	    let newState = [];
	      newState.push({
			projectName: snapshot.val().projectName,
			projectLink:snapshot.val().projectLink,
			projectInfo:snapshot.val().projectInfo,
			uid:snapshot.val().uid,
	      });
	    this.setState({
	      Projects: newState
	    });
	  });

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
					{this.state.Projects.map((project)=>{return(
					<div className='job-text' key={project.id}>
						{project.uid === this.state.authUser.uid ?
						<div>
							<h3>Edit this project</h3>
							<input type='text' className='form-control' placeholder='Project Name' name='projectName' onChange={this.handleChange} defaultValue={project.projectName} ref={(projectName) => this.projectName = projectName}/>
							<br />
							<input type='text' className='form-control' placeholder='e.g. http://myapp.com' name='projectLink' onChange={this.handleChange} defaultValue={project.projectLink} ref={(projectLink) => this.projectLink = projectLink}/>
							<br />
							<textarea type='text' className='form-control' rows='5' placeholder='Brief description of this project' name='projectInfo' onChange={this.handleChange} defaultValue={project.projectInfo} maxlength="60" ref={(projectInfo) => this.projectInfo = projectInfo} />
							<br />

							<div className='col-md-12'>
								<button className='btn yellow-button' onClick={this.handleSubmit}>Save</button>
							</div>
						</div>
						:
						<div>
							<h1 className='text-center job-text text-danger alert alert-danger'>YOU CANNOT EDIT SOMEONE ELSES PROJECT!</h1>
						</div>
					}
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


export default EditProject;



				
