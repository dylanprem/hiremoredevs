import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import JobFeed from '../feeds/JobFeed';



class ViewJob extends Component{
	constructor(props){
		super();
		this.state = {
			JobPosts: [],
			currentJob: props.match.params.viewJob,
			
		}
	}

	componentDidMount() {

	  const JobPostsRef = firebase.database().ref('JobPosts' + '/' + this.state.currentJob);
	  JobPostsRef.once('value', (snapshot) => {
	    let JobPosts = snapshot.val();
	    let newState = [];
	    
	      newState.push({
	        id: this.state.currentJob,
	        companyName: snapshot.val().companyName,
	        email: snapshot.val().email,
	        phone: snapshot.val().phone,
	        position: snapshot.val().position,
	        address: snapshot.val().address,
	        about: snapshot.val().about,
	        applyLink: snapshot.val().applyLink
	      });
	    
	    this.setState({
	      JobPosts: newState
	    });
	  });
	}


	render(){
		return(

			<div>
				{this.state.JobPosts.map((post) => {
			    		return(
	                    <div className="success text-center" key={post.id}>
					       <h3>Company: </h3>
					       <p>{post.companyName}</p>
					       
					       <h3>Email:</h3>
					       <p>{post.email}</p>

					       <h3>Phone:</h3>
					       <p>{post.phone}</p>

					       <h3>Position</h3>
					       <p>{post.position}</p>

					       <h3>Job Location</h3>
					       <p>{post.address}</p>

					       <h3>About the Job:</h3>
					       <p>{post.about}</p>
					       <Link target='_new' className='btn btn-primary' to={`${post.applyLink}`}>Apply</Link>
				        </div>

				         );
	        		})}         
			</div>

		);
	}
}


export default ViewJob;


