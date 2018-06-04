import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class ForgotPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			emailToSendResetLinkTo: '',
			error: null
		}
		this.resetPassword = this.resetPassword.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

	resetPassword(){
		const auth = firebase.auth();
		const emailToSendResetLinkTo = this.state.emailToSendResetLinkTo;
		auth.sendPasswordResetEmail(emailToSendResetLinkTo).then(function() {
		  document.getElementById("pw-success-msg").innerHTML = "Password successfully reset!"
		}).catch(error => {
		  this.setState(byPropKey('error', error));
		});
	}

	render(){
		return(
			<div className='row'>
				<div className='col-md-4 col-md-offset-4 login'>
		          <div className='panel-group'>
		            <div className='panel'>
		              <div className='panel-heading'><h3 className='text-center job-text text-black'>Forgot your password? reset it here.</h3></div>
		              <div className='panel-body text-center'>
		                  <div className='form-group'>
		                    <h1 className='job-text text-black'>Please enter the email address that you signed up with</h1>
		                    <input type="email" className='form-control job-text' name='emailToSendResetLinkTo' value={this.state.emailToSendResetLinkTo} placeholder="youremail@gmail.com" onChange={this.handleChange}/>
		                  </div>
		                  <div className='text-center'>
		                    <button className="btn yellow-button margins job-text" onClick={this.resetPassword}>Send Password reset link</button>
		                  </div>
		              </div>
		            </div>
		          </div>
		          <p id="pw-success-msg" className='job-text text-center'></p>
		          <div className='col-md-12 text-center'>
		          	{ this.state.error && <p className='text-danger job-text'>{this.state.error.message}</p> }
		          </div>
		        </div>
			</div>
		);
	}
}

export default withRouter(ForgotPassword);