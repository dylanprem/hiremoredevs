import React, { Component } from 'react';
import * as firebase from 'firebase';
import {  Link, withRouter } from 'react-router-dom';



class JobsOfInterest extends Component {
	constructor(props){
		super(props);
		this.state = {
			JobPosts: [],
			AppliedJobs:[],
			Profiles:[],
			postsFromUsers:[],
	    	authUser: null,
	    	hasApplied: false
		}	
	this.removeItem = this.removeItem.bind(this);
	}


	removeItem(Id) {
	    const collabRef = firebase.database().ref(`postsFromUsers/${Id}`);
	    collabRef.remove();
	    window.location.reload();
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
		    jobState: JobPosts[post].jobState,
		    zip: JobPosts[post].zip,
		    about: JobPosts[post].about,
		    applyLink: JobPosts[post].applyLink
	      });
	    }
	    this.setState({
	      JobPosts: newState
	    });
	  });

	  const appliedRef = firebase.database().ref('postsFromUsers');
	   appliedRef.once('value', (snapshot) => {
	    let postsFromUsers = snapshot.val();
	    let newState = [];
	    for (let a in postsFromUsers) {
	      newState.push({
	        id: a,
	        jobID:postsFromUsers[a].jobID,
		    uid: postsFromUsers[a].uid,
	      });
	    }
	    this.setState({
	      postsFromUsers: newState
	    });
	  });

	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref('postsFromUsers').orderByChild('uid').equalTo(this.state.authUser.uid).once('value', (snapshot) => {
	        	let data = snapshot.val();
	        	if (data) {
	        		this.setState({hasApplied:true});
	        	} else {
	        		this.setState({hasApplied:false});
	        	}
	        });
			} 
    	});

	}



	render(){
		return(
			<div className='row'>
				{this.state.authUser ?
			    <div className='col-md-12 job-text'>
			    	{this.state.hasApplied ?
			    	<div className='col-md-10 col-md-offset-1'>
			    		<h2 className='job-text text-center'>JOBS YOU'VE EXPRESSED INTEREST IN</h2>
				    	<table className="table jobs-table">
						    <thead>
						      <tr>
						      	<th>Company</th>
						        <th>Position</th>
						        <th>State</th>
						        <th>Zip</th>
						        <th>View Details</th>
						        <th></th>
						      </tr>
						    </thead>
						    {this.state.JobPosts.map((post) => {return(
						    <tbody>
						    	{this.state.postsFromUsers.map((a) => {return(
							    <tr key={a.id}>
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td>{post.companyName}</td> : null}
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td>{post.position}</td> : null }
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td>{post.jobState}</td> : null }
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td>{post.zip}</td> : null }
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td><Link className='btn black-button btn-sm' to={`/job/${post.id}`}>View Details</Link></td> : null }
			                      {a.uid === this.state.authUser.uid && post.id === a.jobID ? <td><button className='btn btn-danger job-text' onClick={() => this.removeItem(a.id)}><span className='glyphicon glyphicon-trash'></span> Not interested</button></td> : null }
			                    </tr>
			                    );})}
						    </tbody>
						    );})}
						</table>
					</div>
					: <h1 className='text-center job-text'>YOU HAVEN'T EXPRESSED INTEREST IN ANY JOBS YET</h1> }
			    </div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(JobsOfInterest);


