import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import * as firebase from 'firebase';
import SignInForm from '../Auth/login';


class ThankYou extends Component{
	constructor(props, context){
		super(props, context);
		this.state = {
	    	authUser:null
		}
    	
	}

	componentDidMount(){
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

				<div className='col-md-12 col-sm-12 col-xs-12 dark-bg-company-info company-info text-center job-text'>
					<h1>Thank you for posting a job ad</h1>
					<h3 className='job-text'>Your ad is under review and will be posted momentarily.</h3>
		    	</div>  	

				:
				null
				}
			</div>
		);
	}
}


export default ThankYou;


