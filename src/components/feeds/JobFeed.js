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

			<div className='col-md-12'>
			

			<table className="table">
				    <thead>
				      <tr>
				      	<th>Company</th>
				        <th>Position</th>
				        <th>Address</th>
				        <th>View Details</th>
				      </tr>
				    </thead>
				    <tbody>
				    {this.state.JobPosts.map((post) => {
    		  			return(
					    <tr className='info' key={post.id}>
	                      <td className='text-warning'>{post.companyName}</td>
	                      <td>{post.position}</td>
	                      <td>{post.address}</td>
	                      <td><Link className='btn btn-success btn-sm' to={`job/${post.id}`}>View Details</Link></td>
	                      
	                    </tr>
		                    );
	          			})}         
				    </tbody>
				</table>
			</div>
			</div>
		);
	}
}

export default JobFeed;