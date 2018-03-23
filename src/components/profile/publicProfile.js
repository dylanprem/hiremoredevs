import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import withAuthorization from '../withAuthorization';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class publicProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			Profiles:[],
			Projects:[],
			authUser:null,
			currentProfile: props.match.params.userProfile,
			
		}
	}


	componentDidMount(){		
		const profilesRef = firebase.database().ref('Profiles/' + this.state.currentProfile);
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    
	      newState.push({
	      	id: this.state.currentProfile,
	      	name: snapshot.val().name,
	      	email: snapshot.val().email,
	      	profilePicture: snapshot.val().profilePicture,
	        about: snapshot.val().about,
	        frameworkOne: snapshot.val().frameworkOne,
	        frameworkTwo: snapshot.val().frameworkTwo,
	        frameworkThree: snapshot.val().frameworkThree,
	        projectLink: snapshot.val().projectLink,
	        projectInfo: snapshot.val().projectInfo,
	        uid: snapshot.val().uid
			
	      });

		    this.setState({
		      Profiles: newState
		    });
		  });

		const projectsRef = firebase.database().ref('Projects');
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

					
					{this.state.Profiles.map((profile) => {
						return(
						<div key={profile.id}>
							
							<div>
								<img style={{with:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={profile.profilePicture} />
								<p className='job-text'>{profile.name}</p>
								<p className='job-text'>{profile.email}</p>
								<h3>About Me</h3>
								<p className='job-text'>{profile.about}</p>
								<h3>My top three</h3>
								<p className='job-text'>{profile.frameworkOne}</p>
								<p className='job-text'>{profile.frameworkTwo}</p>
								<p className='job-text'>{profile.frameworkThree}</p>
								
								<h3>My Best Work</h3>
								
							</div>
							<table className="table text-left job-text">
								    <thead>
								      <tr>
								      	<th>Project Name</th>
								        <th>View Demo</th>
								        <th>Description</th>
								      </tr>
								    </thead>
								    
						       {this.state.Projects.map((project) => {
		    		  			return(
		    		  				<tbody key={project.id}>
				    		  		{project.uid === profile.uid ?
									    <tr className='active' >
					                      <td className='text-warning'>{project.projectName}</td>
					                      <td><Link to={project.projectLink} target='_blank' className='btn black-button'>View</Link> </td>
					                      <td>{project.projectInfo}</td>
					                    </tr>
					                :
					                      null}   
								    </tbody>
								       );
					          			})}
								</table>
							
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

export default publicProfile;