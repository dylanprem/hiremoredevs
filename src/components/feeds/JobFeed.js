import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class JobFeed extends Component {
	constructor(){
	super();
	this.state = {
		JobPosts: [],
		}
	}

	componentDidMount() {
	   const JobsRef = firebase.database().ref('JobPosts');

	   JobsRef.on('value', (snapshot) => {
	    let JobPosts = snapshot.val();
	    let newState = [];
	    for (let post in JobPosts) {
	      newState.push({
	        id: post,
	        companyName: JobPosts[post].companyName,
		    email: JobPosts[post].email,
		    phone: JobPosts[post].phone,
		    position: JobPosts[post].position,
		    address: JobPosts[post].address,
		    about: JobPosts[post].about,
		    applyLink: JobPosts[post].applyLink
	      });
	    }
	    this.setState({
	      JobPosts: newState
	    });
	  });
}
	render(){
		return(
			<div>
			<h1 className="text-center">JOB FEED</h1>

			<div className='col-md-8 col-md-offset-2 text-center'>
			{this.state.JobPosts.map((post) => {
    		  return(
			    <div className='panel-group' key={post.id}>
			      <div className='panel panel-info'>
			      	<div className='panel-heading'>
	                  <h3>{post.companyName}</h3>
	                </div>
	                <div className='panel-body'>
	                  <p className='text-muted'>{post.email}</p>
	                  <p className='text-warning'>{post.phone}</p>
	                  <p className='text-muted'>{post.position}</p>
	                  <p className='text-info'><strong>{post.address}</strong></p>
	                  <p className='text-info'>{post.about}</p>
	             	  <Link className='btn btn-primary' target='_blank' to={`${post.applyLink}`}>Apply</Link>
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

export default JobFeed;