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
	    	newPassword:'',
	    	isSignedInWithGoogle: '' ,
	    	disabledButton: false  	
		}
		this.handleChange = this.handleChange.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.deleteProfile = this.deleteProfile.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);	
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState({
	      [name]: value
	    });
	  }

	deleteProfile(){
		const profileToDelete = firebase.database().ref('Profiles/' + this.state.currentProfile);
		profileToDelete.remove()
		.then(() => {
			const user = firebase.auth().currentUser;
			user.delete();
		})
		.then(() => {
			firebase.auth().signOut();
			this.props.history.push(routes.LANDING);
		})
		.then(() => {
			window.location.reload();
		})
	}

	handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

	updatePassword(){
		const newPassword = this.state.newPassword;
		auth.currentUser.updatePassword(newPassword).then(function(){
			document.getElementById("success-msg").innerHTML = "Password successfully updated!"
		}).catch(error => {
        this.setState(byPropKey('error', error));
    	});
	}


	componentDidMount() {
	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
		        if(this.state.authUser.providerData[0].providerId === 'google.com'){
		        	this.setState({isSignedInWithGoogle: true});
		        } else {
		        	this.setState({isSignedInWithGoogle:false});
		        }
	    	}
    	});

	}



	render(){
		return(
			<div className='row'>
				{this.state.authUser ?
					<div>
						<div className='col-md-12'>
					        {this.state.isSignedInWithGoogle ? null :
							<div className='col-md-4'>
								<h1 className='job-text'>Update Password</h1>
								<input type='password' className='form-control' name='newPassword' value={this.state.newPassword} onChange={this.handleChange} />
								<br />
								<div className='text-center'>
									<button className='yellow-button btn job-text' onClick={this.updatePassword}>Update Password</button>
								</div>
								<div className='col-md-12 text-center'>
						          { this.state.error && <p className='text-danger job-text'>{this.state.error.message}</p> }
						          <p id="success-msg" className='job-text'></p>
						        </div>
							</div>
							 }
						</div>
						<div className='col-md-12'>
							<div className='col-md-4'>
								<h1 className='job-text'>Delete Account</h1>
								<div className='checkbox'>
									<label className='job-text'><input type="checkbox" checked={this.state.disabledButton} onChange={this.handleInputChange} name='disabledButton'  />I want to delete my account</label>
								</div>

								<div className='col-md-4'>
									<button className={this.state.disabledButton ? 'btn btn-danger job-text' : 'btn btn-danger job-text disabled'} onClick={this.deleteProfile}>Delete Account</button>
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


