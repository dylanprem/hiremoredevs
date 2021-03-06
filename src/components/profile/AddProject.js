import React, { Component } from 'react';
import * as firebase from 'firebase';
import './profile.css';


class AddProject extends Component{
	constructor(props){
		super(props);
		this.state = {
			authUser: null,
			projectName:'',
			projectLink:'',
			projectInfo:'',
			Projects:[],
			showForm: false
		}
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFormOnClick = this.showFormOnClick.bind(this);
    this.hideFormOnClick = this.hideFormOnClick.bind(this);
	}



	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	showFormOnClick(){
		this.setState({showForm:true});
	}

	hideFormOnClick(){
		this.setState({showForm:false});
	}


	handleSubmit(e) {
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
	  this.setState({showForm: false});
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
					{this.state.showForm ?
					<div className='job-text'>
						<h3>Add a project</h3>
						<input type='text' className='form-control' placeholder='Project Name' name='projectName' onChange={this.handleChange} value={this.state.projectName} />
						<br />
						<input type='text' className='form-control' placeholder='e.g. http://myapp.com' name='projectLink' onChange={this.handleChange} value={this.state.projectLink} />
						<br />
						<textarea type='text' className='form-control' rows='5' placeholder='Brief description of this project' name='projectInfo' onChange={this.handleChange} value={this.state.projectInfo} maxlength="60" />
						<br />

						<div className='col-md-12 btn-group'>
							<button className='btn yellow-button' onClick={this.handleSubmit}>Add Project</button>
							<button className='btn btn-danger' onClick={this.hideFormOnClick}>Cancel</button>
						</div>
					</div>
					:
					<div className='jobs-container'>
					<button className='btn yellow-button job-text margins' onClick={this.showFormOnClick}><span className='glyphicon glyphicon-plus'></span> Add a project</button>
					</div>
					}
				</div>
				:
				null
				}
			</div>
		);
	}
}


export default AddProject;



				
