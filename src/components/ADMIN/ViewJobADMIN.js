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
			companyName: '',
		    email: '',
		    position: '',
		    state:'',
		    zip:'',
		    about: '',
		    phone:'',
		    applyLink:'',
		    reqOne:'',
			reqTwo:'',
			reqThree:'',
			uid:'',
			JobPostRequests: [],
			JobPosts:[],
			ADMIN:[],
			currentJobADMIN: props.match.params.viewJobADMIN,
	    	authUser:null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	  }

	handleSubmit(e) {
	  e.preventDefault();
	  const JobPostToDelete = firebase.database().ref('JobPostRequests' + '/' + this.state.currentJobADMIN);
	  const JobsRef = firebase.database().ref('JobPosts');
	  const JobPosts = {
	    companyName: this.state.companyName,
	    email: this.state.email,
	    position: this.state.position,
	    about: this.state.about,
	    state: this.state.state,
	    zip: this.state.zip,
	    phone: this.state.phone,
	    applyLink: this.state.applyLink,
	    reqOne:this.state.reqOne,
		reqTwo:this.state.reqTwo,
		reqThree:this.state.reqThree,
		uid: this.state.uid
	  }


	  JobsRef.push(JobPosts);
	  this.setState({
		companyName: '',
	    email: '',
	    position: '',
	    state:'',
	    zip:'',
	    about: '',
	    phone:'',
	    applyLink:'',
	    reqOne:'',
		reqTwo:'',
		reqThree:'',
		uid:'',
	  });

	  JobPostToDelete.remove();		
	  this.props.history.push(routes.ADMIN_APPROVE_JOB);  
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
	        applyLink: snapshot.val().applyLink,
	        uid: snapshot.val().uid
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
					<div className='col-md-6 col-md-offset-3 col-sm-6 col-xs-12 dark-bg-company-info company-info job-text'>
						{this.state.JobPostRequests.map((post) => {
					    		return(
			                    <div className="success text-center" key={post.id}>
							       <h3>Company: </h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='companyName' value={this.state.companyName = post.companyName} />
							       
							       <h3>Email:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='email' value={this.state.email = post.email} />

							       <h3>Phone:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='phone' value={this.state.phone = post.phone} />

							       <h3>Position</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='position' value={this.state.position = post.position} />

							       <h3>Job Location</h3>

							       <h4 className='text-left'>State</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='state' value={this.state.state = post.state} />

							       <h4 className='text-left'>Zip</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='zip' value={this.state.zip = post.zip} />

							       <h3>About the Job:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='about' value={this.state.about = post.about} />

							       <h3>Requirements</h3>

							       <h4 className='text-left'>Req One</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqOne' value={this.state.reqOne = post.reqOne} />

							       <h4 className='text-left'>Req Two</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqTwo' value={this.state.reqTwo = post.reqTwo} />

							       <h4 className='text-left'>Req Three</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqThree' value={this.state.reqThree = post.reqThree} />

							       <h3>Application Link</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='applyLink' value={this.state.applyLink = post.applyLink} />

							       <h3>UID</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='uid' value={this.state.uid = post.uid} />
							       <button onClick={this.handleSubmit} className='btn btn-info'>Approve</button>
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


