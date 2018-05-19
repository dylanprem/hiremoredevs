import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddProject from './AddProject';
import ProfileButtonToggle from '../header/ProfileButton';
import SignInForm from '../Auth/login';


class viewProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			Profiles:[],
			Projects:[]
		}
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(projectId) {
	    const projectsRef = firebase.database().ref(`Projects/${projectId}`);
	    projectsRef.remove();
	    window.location.reload();
	}


	componentDidMount(){	
		const profilesRef = firebase.database().ref('Profiles' );
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    for (let profile in Profiles){
	      newState.push({
	        id: profile,
	        about: Profiles[profile].about,
	        frameworkOne:Profiles[profile].frameworkOne,
			frameworkTwo:Profiles[profile].frameworkTwo,
			frameworkThree:Profiles[profile].frameworkThree,
			uid:Profiles[profile].uid,
	      });
	    }
	    this.setState({
	      Profiles: newState
	    });
	  });

		const projectsRef = firebase.database().ref('Projects' );
		projectsRef.once('value', (snapshot) => {
	    let Projects = snapshot.val();
	    let newState = [];
	    for (let project in Projects){
	      newState.push({
	        id: project,
			projectName:Projects[project].projectName,
			projectLink:Projects[project].projectLink,
			projectInfo:Projects[project].projectInfo,
			uid:Projects[project].uid,
	      });
	    }
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
	

	render() {
		return (
			<div className='row profile-container'>
			{this.state.authUser ?
				
				<div className='col-md-12 text-center'>
					<img style={{width:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={this.state.authUser.photoURL} />
					<p className='job-text'>{this.state.authUser.displayName}</p>
					<p className='job-text'>{this.state.authUser.email}</p>
					{this.state.Profiles.map((profile) => {
						return(
						<div key={profile.id}>
							{profile.uid === this.state.authUser.uid ?
							<div className='col-md-12'>
								<h3>About Me</h3>
								<p className='job-text'>{profile.about}</p>
								<h3>My top three</h3>
								<p className='job-text'>{profile.frameworkOne}</p>
								<p className='job-text'>{profile.frameworkTwo}</p>
								<p className='job-text'>{profile.frameworkThree}</p>
								
								<AddProject />
								<div className='projects'>
						       {this.state.Projects.map((project) => {
		    		  			return(
		    		  				<div key={project.id} >
				    		  		{project.uid === this.state.authUser.uid ?
				    		  			<div className='panel-group col-md-3'>
				    		  			<div className='panel panel-default col-md-12'>
									    <div className='panel-body col-md-12 job-text text-black'>

					                      <div className='row'><h2 className='text-warning'>{project.projectName}</h2></div>
					                      <div className='text-center job-text row'><Link to={project.projectLink} target='_blank' className='btn black-button'>View</Link> </div>
					                      <div className='row'><p>{project.projectInfo}</p></div>
					                      <div className='text-center job-text row'>{project.uid === this.state.authUser.uid ?
		               						 <button type='submit' className="btn btn-danger pull-right" onClick={() => this.removeItem(project.id)}><span className='glyphicon glyphicon-trash'></span> DELETE</button> : null}
		               					  </div>
					                    </div>
					                    </div>
					                    </div>
					                :
					                null}   
								    </div>
								       );
					          		})}
								</div>
								
							</div>
							:
							null}
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

export default viewProfile;