import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';

class ViewSignupRequest extends Component {
	constructor(props){
	super(props);
	this.state = {
		authUser: null,
		ADMIN: [],
		Profiles:[],
		RECRUITERSignupRequests:[],
		RECRUITER:[],
		currentReq: props.match.params.viewReq,
		uid:'',
		companyName:'',
		linkedin:'',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	removeItem(id) {
	    const reqToDeleteref = firebase.database().ref('RECRUITERSignupRequests' + '/' + this.state.currentReq);
	    reqToDeleteref.remove();
	}

	handleSubmit(e) {
	  e.preventDefault();
	  const approvereqref = firebase.database().ref('RECRUITERSignupRequests' + '/' + this.state.currentReq);
	  const recruitersRef = firebase.database().ref('RECRUITER');
	  const RECRUITER = {
	    companyName: this.state.companyName,
	    linkedin: this.state.linkedin,
		uid: this.state.uid
	  }


	  recruitersRef.push(RECRUITER);
	  this.setState({
	    companyName: '',
	    linkedin:'',
	    uid:'',
	  });
	  
	  approvereqref.remove();
	  this.props.history.push(routes.RECRUITER_SIGNUP_REQUESTS);
	}


	componentDidMount() {
	  const reqref = firebase.database().ref('RECRUITERSignupRequests' + '/' + this.state.currentReq);
	  reqref.on('value', (snapshot) => {
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
										<input type='text' onChange={this.handleChange} name='companyName' value={this.state.companyName = req.companyName} className='form-control' />
										<input type='text' onChange={this.handleChange} name='linkedin' value={this.state.linkedin = req.linkedin} className='form-control' />
										<input type='text' onChange={this.handleChange} name='uid' className='form-control' value={this.state.uid = req.uid} />
									</div>
									<div className='text-center col-md-4 col-md-offset-4'>
										<button className='btn yellow-button job-text btn-block' onClick={this.handleSubmit}>Approve</button>
									</div>
									<div className='text-center col-md-4 col-md-offset-4'>
										<button className='btn btn-danger job-text btn-block' onClick={() => this.removeItem(req.id)}>Deny</button>
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