import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import './feeds.css';
import SignInForm from '../Auth/login';

class JobFeed extends Component {
	constructor(props){
	super(props);
	this.state = {
		JobPosts: [],
		ADMIN: [],
		Profiles:[],
		authUser: null,
		uid:'',
		searchedState:'',
		searchedZip:'',
		noResults: false
		}
	this.removeItem = this.removeItem.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.orderByState = this.orderByState.bind(this);
	this.orderByZip = this.orderByZip.bind(this);

	}
	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	 }

	removeItem(jobId) {
	    const JobsRef = firebase.database().ref(`JobPosts/${jobId}`);
	    JobsRef.remove();
	    // window.location.reload();
	}

	orderByState(){
		const stateRef = firebase.database().ref("JobPosts").orderByChild("State").equalTo(this.state.searchedState);
		stateRef.on('value', (snapshot) => {
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
		    applyLink: JobPosts[post].applyLink
	      });
	    }
	    this.setState({
	      JobPosts: newState
	    });
	    if (JobPosts){
	    	this.setState({ noResults:false });
	    } else {
	    	this.setState({ noResults:true });
	    }
	  });
	}

	orderByZip(){
		const stateRef = firebase.database().ref("JobPosts").orderByChild("zip").equalTo(this.state.searchedZip);
		stateRef.on('value', (snapshot) => {
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
		    applyLink: JobPosts[post].applyLink
	      });
	    }
	    this.setState({
	      JobPosts: newState
	    });

	    if (JobPosts){
	    	this.setState({ noResults:false });
	    } else {
	    	this.setState({ noResults:true });
	    }
	  });
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
		    State: JobPosts[post].State,
		    zip: JobPosts[post].zip,
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
			<div className='col-md-10 col-md-offset-1 jobs-container'>
			<div className='row job-text'>
				<div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3'>
					<div className='form-group'>
							<label>Search By State</label>
							<select className='form-control' name='searchedState' onChange={this.handleChange} value={this.state.searchedState} >
								<option value="" disabled selected>Select an option</option>
								<option value="Alabama">Alabama</option>
								<option value="Alaska">Alaska</option>
								<option value="Arizona">Arizona</option>
								<option value="Arkansas">Arkansas</option>
								<option value="California">California</option>
								<option value="Colorado">Colorado</option>
								<option value="Connecticut">Connecticut</option>
								<option value="Delaware">Delaware</option>
								<option value="District Of Columbia">District Of Columbia</option>
								<option value="Florida">Florida</option>
								<option value="Georgia">Georgia</option>
								<option value="Hawaii">Hawaii</option>
								<option value="Idaho">Idaho</option>
								<option value="Illinois">Illinois</option>
								<option value="Indiana">Indiana</option>
								<option value="Iowa">Iowa</option>
								<option value="Kansas">Kansas</option>
								<option value="Kentucky">Kentucky</option>
								<option value="Louisiana">Louisiana</option>
								<option value="Maine">Maine</option>
								<option value="Maryland">Maryland</option>
								<option value="Massachusetts">Massachusetts</option>
								<option value="Michigan">Michigan</option>
								<option value="Minnesota">Minnesota</option>
								<option value="Mississippi">Mississippi</option>
								<option value="Missouri">Missouri</option>
								<option value="Montana">Montana</option>
								<option value="Nebraska">Nebraska</option>
								<option value="Nevada">Nevada</option>
								<option value="New Hampshire">New Hampshire</option>
								<option value="New Jersey">New Jersey</option>
								<option value="New Mexico">New Mexico</option>
								<option value="New York">New York</option>
								<option value="North Carolina">North Carolina</option>
								<option value="North Dakota">North Dakota</option>
								<option value="Ohio">Ohio</option>
								<option value="Oklahoma">Oklahoma</option>
								<option value="Oregon">Oregon</option>
								<option value="Pennsylvania">Pennsylvania</option>
								<option value="Rhode Island">Rhode Island</option>
								<option value="South Carolina">South Carolina</option>
								<option value="South Dakota">South Dakota</option>
								<option value="Tennessee">Tennessee</option>
								<option value="Texas">Texas</option>
								<option value="Utah">Utah</option>
								<option value="Vermont">Vermont</option>
								<option value="Virginia">Virginia</option>
								<option value="Washington">Washington</option>
								<option value="West Virginia">West Virginia</option>
								<option value="Wisconsin">Wisconsin</option>
								<option value="Wyoming">Wyoming</option>
							</select>
					</div>
					<div className='text-center'>
						<button className='btn yellow-button' onClick={this.orderByState}>Submit</button>
					</div>
				</div>
			</div>
			<div className='row job-text'>
				<div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3'>
					<div className='form-group'>
						<label>Search by Zip Code</label>
						<input type='text' className='form-control' name='searchedZip' value={this.state.searchedZip} onChange={this.handleChange} />
					</div>
					<div className='text-center'>
						<button onClick={this.orderByZip} className='btn yellow-button'>Submit</button>
					</div>
				</div>
			</div>

			<h1 className="text-center job-text">JOB FEED</h1>

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
				    {this.state.JobPosts.map((post) => {
    		  			return(
					    <tr className='active' key={post.id}>
	                      <td className='text-white'>{post.companyName}</td>
	                      <td>{post.position}</td>
	                      <td>{post.State}</td>
	                      <td>{post.zip}</td>
	                      <td><Link className='btn black-button btn-sm' to={`job/${post.id}`}>View Details</Link></td>
	                      
	                      {this.state.ADMIN.map((admins) => {
	                      	return(
	                      		<td key={admins.id} className='pull-right'>
		                  		{this.state.authUser.uid === admins.uid ?
						 			<button type='submit' className="btn btn-danger" onClick={() => this.removeItem(post.id)}><span className='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;Delete</button> 
						 		: null}
							  	</td> 
	                      	);
	                      })}
	                  	  
	                    </tr>
		                    );
	          			})}         
				    </tbody>
			</table>
			{this.state.noResults ?
			<h1 id="error-message" className='job-text text-center'>The search returned with no results.</h1>
			:
			null}
			</div>
			:
			null}
			</div>
		);
	}
}

export default withRouter(JobFeed);