import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class JobSeekers extends Component {
	constructor() {
    super();
    this.state = {
      JobSeekerPosts: [],
	  }
	    
	}
	
	componentDidMount() {
	   const JobSeekersRef = firebase.database().ref('JobSeekerPosts');
	   JobSeekersRef.on('value', (snapshot) => {
	    let JobSeekerPosts = snapshot.val();
	    let newState = [];
	    for (let post in JobSeekerPosts) {
	      newState.push({
	        id: post,
	        firstName: JobSeekerPosts[post].firstName,
		    lastName: JobSeekerPosts[post].lastName,
		    email: JobSeekerPosts[post].email,
		    position: JobSeekerPosts[post].position,
		    state: JobSeekerPosts[post].state,
		    city: JobSeekerPosts[post].city,
		    relocate: JobSeekerPosts[post].relocate,
		    about: JobSeekerPosts[post].about,
		    github: JobSeekerPosts[post].github,
		    linkedin: JobSeekerPosts[post].linkedin
	      });
	    }
	    this.setState({
	      JobSeekerPosts: newState
	    });
	  });
	}

	render(){
		return(
			<div>
			<h1 className="text-center">JOB SEEKERS</h1>

			<div className='col-md-8 col-md-offset-2 text-center'>
			{this.state.JobSeekerPosts.map((post) => {
    		  return(
			    <div className='panel-group' key={post.id}>
			      <div className='panel panel-primary'>
			      	<div className='panel-heading'>
	                  <h3>{post.firstName} {post.lastName}</h3>
	                </div>
	                <div className='panel-body'>
	                  <p className='text-info'>{post.email}</p>
	                  <p className='text-info'>{post.position}</p>
	                  <p className='text-info'><strong>{post.city}, {post.state}</strong></p>
	                  <p className='text-info'>{post.relocate}</p>
	                  <p className='text-info'>{post.about}</p>
	                  <div className='form-group'>
	                  	<Link target='_blank' to={`${post.github}`} ><img src='https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-48.png' className='img-responsive center-block' /></Link>
	                  </div>
	                  <div className='form-group'>
	                  	<Link target='_blank' to={`${post.linkedin}`} ><img src='https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-48.png' className='img-responsive center-block' /></Link>
	                  </div>
	                </div>
                  </div>
                </div>
                    );
      			})}
			</div>
			</div>
		);
	}
}

export default JobSeekers;