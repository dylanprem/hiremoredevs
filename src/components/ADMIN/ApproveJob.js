import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';

class ApproveJob extends Component {
	constructor(props){
	super(props);
	this.state = {
		JobPostRequests: [],
		ADMIN: [],
		Profiles:[],
		authUser: null,
		isAdmin:false
		}
	this.removeItem = this.removeItem.bind(this);
	}

	removeItem(jobId) {
	    const JobsRef = firebase.database().ref(`JobPostRequests/${jobId}`);
	    JobsRef.remove();
	    // window.location.reload();
	}


	componentDidMount() {
	   // window.addEventListener('load', this.createProfile);
	   const JobsRef = firebase.database().ref('JobPostRequests');
	   JobsRef.on('value', (snapshot) => {
	    let JobPostRequests = snapshot.val();
	    let newState = [];
	    for (let post in JobPostRequests) {
	      newState.push({
	        id: post,
	        companyName: JobPostRequests[post].companyName,
		    email: JobPostRequests[post].email,
		    phone: JobPostRequests[post].phone,
		    position: JobPostRequests[post].position,
		    jobState: JobPostRequests[post].jobState,
		    zip: JobPostRequests[post].zip,
		    about: JobPostRequests[post].about,
		    applyLink: JobPostRequests[post].applyLink
	      });
	    }
	    this.setState({
	      JobPostRequests: newState
	    });
	  });



	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("ADMIN").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isAdmin:true});
				    } else {
				    	this.setState({isAdmin:false});
				    }
				});
	      } 
    	});	
	}


	

	render(){

		return(
			<div className='row dark-bg-feed'>			
			{this.state.authUser ? 
			<div className='col-md-12 jobs-container'>
				{this.state.isAdmin ?
				<div className='col-md-10 col-md-offset-1'>
					<h1 className="text-center job-text">JOB POST REQUESTS</h1>
					<table className="table jobs-table">
					    <thead>
					      <tr>
					      	<th>Company</th>
					        <th>Position</th>
					        <th>State</th>
					        <th>Zip</th>
					        <th>View Details</th>
					        <th>&nbsp;</th>
					      </tr>
					    </thead>
					    <tbody>
					    {this.state.JobPostRequests.map((post) => {
	    		  			return(
						    <tr className='active' key={post.id}>
		                      <td className='text-warning'>{post.companyName}</td>
		                      <td>{post.position}</td>
		                      <td>{post.jobState}</td>
		                      <td>{post.zip}</td>
		                      <td><Link className='btn black-button btn-sm' to={`admin-view-job/${post.id}`}>View Details</Link></td>
		                      <td className='text-right'><button type='submit' className="btn btn-danger" onClick={() => this.removeItem(post.id)}><span className='glyphicon glyphicon-trash'></span> Delete</button></td> 			          
		                    </tr>
		                    );
		                 })}       
					    </tbody>
					</table>
				</div>
				: 
				<h1 className="job-text alert alert-danger">OOPS! YOU DO NOT HAVE ACCESS TO THIS PAGE.</h1> }
			</div>
			: null }
			</div>
		);
	}
}

export default withRouter(ApproveJob);