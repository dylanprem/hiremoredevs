import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';




class ViewJobADMIN extends Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			JobPostRequests: [],
			ADMIN:[],
			currentJobADMIN: props.match.params.viewJobADMIN,
	    	authUser:null
		}
	}



	componentDidMount() {

	  const JobPostsRef = firebase.database().ref('JobPostRequests' + '/' + this.state.currentJobADMIN);
	  JobPostsRef.once('value', (snapshot) => {
	    let JobPostRequests = snapshot.val();
	    let newState = [];
	    
	      newState.push({
	        id: this.state.currentJobADMIN,
	        companyName: snapshot.val().companyName,
	        email: snapshot.val().email,
	        phone: snapshot.val().phone,
	        position: snapshot.val().position,
	        state: snapshot.val().state,
	        zip: snapshot.val().zip,
	        about: snapshot.val().about,
	        reqOne:snapshot.val().reqOne,
	        reqTwo: snapshot.val().reqTwo,
	        reqThree: snapshot.val().reqThree,
	        applyLink: snapshot.val().applyLink
	      });
	    
	    this.setState({
	      JobPostRequests: newState
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
			<div className='row'>
				{this.state.authUser ?
				<div>
				{this.state.ADMIN.map((admins) => {
				return(
				<div key={admins.id}>
				{this.state.authUser.uid === admins.uid ?
					<div className='col-md-12 col-sm-12 col-xs-12 dark-bg-company-info company-info'>
						{this.state.JobPostRequests.map((post) => {
					    		return(
			                    <div className="success text-center" key={post.id}>
							       <h3>Company: </h3>
							       <p className='job-text'>{post.companyName}</p>
							       
							       <h3>Email:</h3>
							       <p className='job-text'>{post.email}</p>

							       <h3>Phone:</h3>
							       <p className='job-text'>{post.phone}</p>

							       <h3>Position</h3>
							       <p className='job-text'>{post.position}</p>

							       <h3>Job Location</h3>
							       <p className='job-text'>{post.state}, {post.zip}</p>

							       <h3>About the Job:</h3>
							       <p className='job-text'>{post.about}</p>

							       <h3>Requirements</h3>
							       <p className='job-text'>{post.reqOne}</p>
							       <p className='job-text'>{post.reqTwo}</p>
							       <p className='job-text'>{post.reqThree}</p>
							       <Link target='_new' className='btn yellow-button' to={`${post.applyLink}`}>Apply</Link>
						        </div>
						         );
			        		})}		        	       
					</div>
					: <h1 className="job-text alert alert-danger">OOPS! YOU DO NOT HAVE ACCESS TO THIS PAGE.</h1> }
				</div>
		         );
		        })}   	
				</div>
				:
				<div className='text-center'>
					<h1>Please Login</h1>
				</div>
				}
			</div>
		);
	}
}


export default ViewJobADMIN;


