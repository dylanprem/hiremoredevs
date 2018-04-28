import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { auth,db } from '../../firebase';
import Phone from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as BrowserHistory, Router, Route, Link } from 'react-router-dom';
import SignInForm from '../Auth/login';
import ThankYouRec from './ThankYouRec';


class RECRUITERSignupForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
	    companyName: '',
	    linkedin: '',
	    authUser:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({
    	[e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
  const recruitersRef = firebase.database().ref('RECRUITERSignupRequests');
  const RECRUITERSignupRequests = {
    companyName: this.state.companyName,
    linkedin: this.state.linkedin,
	uid: this.state.authUser.uid
  }
  recruitersRef.push(RECRUITERSignupRequests);
  this.setState({
    companyName: '',
    linkedin:'',
  });  
}

componentDidMount(){

      firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } 
    });
}

componentDidUpdate(){
	firebase.database().ref("RECRUITERSignupRequests").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
	    const userDataAlt = snapshot.val();
	    if (userDataAlt){
			document.getElementById("signupForm").style.display = "none";
			document.getElementById("thankYouMsg").style.display = "block";
	    } else {
	    	document.getElementById("thankYouMsg").style.display = "none";
			document.getElementById("signupForm").style.display = "block";
	    }
	});
}

	render(){
		return(
			<div>
			{this.state.authUser ?
			<div className='row job-form'>
			<div className='col-md-6 col-md-offset-3' id="signupForm">
				<h1 className='text-center'>Please fill out this form sign up as a recruiter</h1>
				<form className='job-text' onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label>What Company do you work for?</label>
						<input className='form-control' name='companyName' onChange={this.handleChange} value={this.state.companyName} />
					</div>
					<div className='form-group'>
						<label>LinkedIn URL</label>
						<div class="input-group">
						    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
						    <input required type='text' className='form-control' name='linkedin' value={this.state.linkedin} onChange={this.handleChange} placeholder='Add the direct link to your LinkedIn' />
							
						</div>
						<small className='text-danger'>* URL must include https://</small>	
					</div>
					<button className='btn yellow-button btn-block' type='submit'>Post</button>
				</form>
			</div>
			<div id="thankYouMsg">
				<ThankYouRec />
			</div>
			</div>
			:
			null
			}
			</div>
		);
	}
}


export default RECRUITERSignupForm;
