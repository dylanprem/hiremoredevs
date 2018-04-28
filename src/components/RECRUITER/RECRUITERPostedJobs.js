import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import SignInForm from '../Auth/login';

class RECRUITERPostedJobs extends Component {
	constructor(props){
	super(props);
	this.state = {
		JobPosts: [],
		RECRUITER: [],
		Profiles:[],
		authUser: null,
		}
	this.removeItem = this.removeItem.bind(this);

	}


	removeItem(jobId) {
	    const JobsRef = firebase.database().ref(`JobPosts/${jobId}`);
	    JobsRef.remove();
	    // window.location.reload();
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
		    State: JobPosts[post].State,
		    zip: JobPosts[post].zip,
		    about: JobPosts[post].about,
		    applyLink: JobPosts[post].applyLink,
		    uid: JobPosts[post].uid
	      });
	    }
	    this.setState({
	      JobPosts: newState
	    });
	  });


      	const recruiterRef = firebase.database().ref('RECRUITER');
        recruiterRef.once('value', (snapshot) => {		
		    let RECRUITER = snapshot.val();
		    let newState = [];
		    for (let r in RECRUITER){
		      newState.push({
		        id: r,
				uid:RECRUITER[r].uid,
		      });

		    }
		    this.setState({
		      RECRUITER: newState
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
			<div className='col-md-12'>
			{this.state.RECRUITER.map((r) => {return(
				<div key={r.id}>
					<h1 className="text-center job-text">JOBS POSTED BY YOU</h1>
					<table className="table jobs-table">
						    <thead>
						      <tr>
						      	<th>Company</th>
						        <th>Position</th>
						        <th>State</th>
						        <th>Zip</th>
						        <th>View Details</th>
						      </tr>
						    </thead>
						    <tbody>
						    {this.state.JobPosts.map((post) => {
		    		  			return(
							    <tr className='active' key={post.id}>
			                      {r.uid === post.uid ? <td className='text-warning'>{post.companyName}</td> : null}
			                      {r.uid === post.uid ? <td>{post.position}</td> : null }
			                      {r.uid === post.uid ? <td>{post.State}</td> : null }
			                      {r.uid === post.uid ? <td>{post.zip}</td> : null }
			                      {r.uid === post.uid ? <td><Link className='btn black-button btn-sm' to={`job/${post.id}`}>View Details</Link></td> : null }
		                      	  {r.uid === post.uid ? <td><button type='submit' className="btn btn-danger" onClick={() => this.removeItem(post.id)}>Delete</button></td> : null }
			                    </tr>
				                    );
			          			})}         
						    </tbody>
					</table>
				</div>
			);})}	
			</div>
			:
			null}
			</div>
		);
	}
}

export default RECRUITERPostedJobs;