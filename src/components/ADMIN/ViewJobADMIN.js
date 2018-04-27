import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SignInForm from '../Auth/login';




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
	    companyName: this.companyName.value,
	    email: this.email.value,
	    position: this.position.value,
	    about: this.about.value,
	    State: this.State.value,
	    zip: this.zip.value,
	    phone: this.phone.value,
	    applyLink: this.applyLink.value,
	    reqOne:this.reqOne.value,
		reqTwo:this.reqTwo.value,
		reqThree:this.reqThree.value,
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
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='companyName' ref={(companyName) => this.companyName = companyName} defaultValue={post.companyName} />
							       
							       <h3>Email:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='email' ref={(email) => this.email = email} defaultValue={post.email} />

							       <h3>Phone:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='phone' ref={(phone) => this.phone = phone} defaultValue={post.phone} />

							       <h3>Position</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='position' ref={(position) => this.position = position} defaultValue={post.position} />

							       <h3>Job Location</h3>

							       <h4 className='text-left'>State</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='State' ref={(State) => this.State = State} defaultValue={post.state} />

							       <h4 className='text-left'>Zip</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='zip' ref={(zip) => this.zip = zip} defaultValue={post.zip} />

							       <h3>About the Job:</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' ref={(about) => this.about = about} defaultValue={post.about} />

							       <h3>Requirements</h3>

							       <h4 className='text-left'>Req One</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqOne' ref={(reqOne) => this.reqOne = reqOne} defaultValue={post.reqOne} />

							       <h4 className='text-left'>Req Two</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqTwo' ref={(reqTwo) => this.reqTwo = reqTwo} defaultValue={post.reqTwo} />

							       <h4 className='text-left'>Req Three</h4>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqThree' ref={(reqThree) => this.reqThree = reqThree} defaultValue={post.reqThree} />

							       <h3>Application Link</h3>
							       <input type='text' onChange={this.handleChange} className='job-text form-control' name='applyLink' ref={(applyLink) => this.applyLink = applyLink} defaultValue={post.applyLink} />

							       <h3>UID</h3>
							       <input type='text' className='job-text form-control' name='uid' value={this.state.uid = post.uid} />
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
				<SignInForm />
				}
			</div>
		);
	}
}


export default ViewJobADMIN;


