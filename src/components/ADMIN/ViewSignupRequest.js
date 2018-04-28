import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { withRouter, history, Link, BrowserRouter as BrowserHistory, Route } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SignInForm from '../Auth/login';


class ViewSignupRequest extends Component {
	constructor(props){
	super(props);
	this.state = {
		ADMIN: [],
		Profiles:[],
		RECRUITERSignupRequests:[],
		RECRUITER:[],
		currentReq: props.match.params.viewReq,
		uid:'',
		companyName:'',
		linkedin:'',
		authUser: null,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}



	handleSubmit(e) {
	  
	  const deleteRef = firebase.database().ref('RECRUITERSignupRequests/' + this.state.currentReq );
	  const recruitersRef = firebase.database().ref('RECRUITER');
	  const RECRUITER = {
	    companyName: this.companyName.value,
	    linkedin: this.linkedin.value,
		uid: this.uid.value
	  }
	  recruitersRef.push(RECRUITER);
	  this.setState({
	    companyName: '',
	    linkedin:'',
	    uid:'',
	  });
	  deleteRef.remove();
	  this.props.history.push(routes.RECRUITER_SIGNUP_REQUESTS);
	  window.location.reload();
	}


	componentDidMount() {
	  const reqref = firebase.database().ref('RECRUITERSignupRequests' + '/' + this.state.currentReq);
	  reqref.once('value', (snapshot) => {
	  	let RECRUITERSignupRequests = snapshot.val();
	  	let newState = [];
	  	newState.push({
	      	id: this.state.currentReq,
			companyName: snapshot.val().companyName,
			linkedin: snapshot.val().linkedin,
			uid: snapshot.val().uid,
	      });
	    
	    this.setState({
	      RECRUITERSignupRequests: newState
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



	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<div>
			{this.state.ADMIN.map((admins) => {
			return(
				<div key={admins.id}>
					{admins.uid === this.state.authUser.uid ? 
							<div>
								{this.state.RECRUITERSignupRequests.map((req) => {
								return(
								<div key={req.id} className='job-text'>

									<div className='col-md-4 col-md-offset-4'>
										<div className='form-group'>
											<label>Company Name</label>
											<input type='text' onChange={this.handleChange} defaultValue={req.companyName} name='companyName' ref={(companyName) => this.companyName = companyName} className='form-control' />
										</div>
										<div className='form-group'>
											<label>LinkedIn</label>
											<input type='text' onChange={this.handleChange} name='linkedin' defaultValue={req.linkedin} ref={(linkedin) => this.linkedin = linkedin} className='form-control' />
										</div>
										<div className='form-group'>
											<label>UID</label>
											<input type='text' onChange={this.handleChange} name='uid' className='form-control' defaultValue={req.uid} ref={(uid) => this.uid = uid} />
										</div>
									</div>
									<div className='text-center col-md-4 col-md-offset-4'>
										<button className='btn yellow-button job-text btn-block' onClick={this.handleSubmit}>Approve</button>
									</div>

								</div>
								);
								})}
							</div> 
					: null }
				</div>
					);
		        })}
			</div>
			: null }
			</div>
		);
	}
}

export default ViewSignupRequest;