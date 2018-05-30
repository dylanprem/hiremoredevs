import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import './profile.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import SignInForm from '../Auth/login';

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
			<div className='row'>
			{this.state.authUser ?
				<div className='col-md-12 text-center'>

					
					{this.state.Profiles.map((profile) => {
						return(
						<div key={profile.id}>
							
							<div>
								<img style={{width:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={profile.profilePicture} />
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
							<div className='projects'>
						       {this.state.Projects.map((project) => {
		    		  			return(
		    		  				<div key={project.id} >
				    		  		{project.uid === profile.uid ?
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
								<Link className='yellow-button btn job-text' to={`/message/${profile.uid}`}>Message</Link>
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

export default withRouter(publicProfile);