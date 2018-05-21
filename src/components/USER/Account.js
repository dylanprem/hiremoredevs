import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import CollabsPosted from './CollabsPosted';
import JobsOfInterest from './JobsOfInterest';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Account extends Component {
	constructor(props){
		super(props);
		this.state = {
	    	authUser: null,
	    	newPassword:''	    	
		}
		this.handleChange = this.handleChange.bind(this);
		this.updatePassword = this.updatePassword.bind(this);	
	}

	handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

	updatePassword(){
		const newPassword = this.state.newPassword;
		auth.currentUser.updatePassword(newPassword).then(function(){
			window.location.reload();
			alert('updated');
		}).catch(error => {
        this.setState(byPropKey('error', error));
    	});
	}


	componentDidMount() {
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
						<div className='col-md-12'>
							<div className='col-md-12 text-center text-black'>
					          { this.state.error && <p className='text-danger job-text'>{this.state.error.message}</p> }
					        </div>
							<div className='col-md-4'>
								<h1 className='job-text'>Update Password</h1>
								<input type='password' className='form-control' name='newPassword' value={this.state.newPassword} onChange={this.handleChange} />
								<div className='text-center'>
									<button className='yellow-button btn job-text' onSubmit={this.updatePassword}>Update Password</button>
								</div>
							</div>
						</div>
						<div className='col-md-12'>
					    	<div className='col-md-6'>
					    		<CollabsPosted />
					    	</div>
					    	<div className='col-md-6'>
					    		<JobsOfInterest />
					    	</div>
				    	</div>
			    	</div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(Account);


