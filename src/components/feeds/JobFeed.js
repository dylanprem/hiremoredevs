import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import './feeds.css';

class JobFeed extends Component {
	constructor(props){
	super(props);
	this.state = {
		JobPosts: [],
		ADMIN: [],
		Profiles:[],
		authUser: null,
		uid:''
		}
	this.removeItem = this.removeItem.bind(this);
	// this.createProfile = this.createProfile.bind(this);
	}

	removeItem(jobId) {
	    const JobsRef = firebase.database().ref(`JobPosts/${jobId}`);
	    JobsRef.remove();
	    window.location.reload();
	}

	componentDidMount() {
	   // window.addEventListener('load', this.createProfile);
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


	  const ADMINref = firebase.database().ref('ADMIN');
	  ADMINref.on('value', (snapshot) => {
	  	let ADMIN = snapshot.val();
	  	console.log(snapshot.val());
	  	let newState = [];
	  	for (let admins in ADMIN){
	      newState.push({
	      	id: admins,
			uid: ADMIN[admins].uid,
	      });
	    }
	    this.setState({
	      ADMIN: newState
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
			<div className='row dark-bg-feed'>
			
			{this.state.authUser ? 
			<div className='col-md-12 jobs-container'>
			<h1 className="text-center">JOB FEED</h1>

			<table className="table jobs-table">
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
					    <tr className='active' key={post.id}>
	                      <td className='text-warning'>{post.companyName}</td>
	                      <td>{post.position}</td>
	                      <td>{post.address}</td>
	                      <td><Link className='btn black-button btn-sm' to={`job/${post.id}`}>View Details</Link></td>
	                      
	                      {this.state.ADMIN.map((admins) => {
	                      	return(
	                      		<td key={admins.id}>
		                  		{this.state.authUser.uid === admins.uid ?
						 			<button type='submit' className="btn btn-danger" onClick={() => this.removeItem(post.id)}>Delete</button> 
						 		: null}
							  	</td> 
	                      	);
	                      })}
	                  	  
	                    </tr>
		                    );
	          			})}         
				    </tbody>
				</table>
			</div>
			:
			null}
			</div>
		);
	}
}

export default JobFeed;