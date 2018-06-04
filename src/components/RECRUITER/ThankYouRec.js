import React, { Component } from 'react';
import * as firebase from 'firebase';


class ThankYouRec extends Component{
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
					<h1>Thank you for Registering</h1>
					<h3 className='job-text'>Your request is under review and will be granted depending on the information you've provided.</h3>
		    	</div>  	

				:
				null
				}
			</div>
		);
	}
}


export default ThankYouRec;


