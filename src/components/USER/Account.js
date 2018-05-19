import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import CollabsPosted from './CollabsPosted';
import JobsOfInterest from './JobsOfInterest';



class Account extends Component {
	constructor(props){
		super(props);
		this.state = {
	    	authUser: null,	    	
		}	
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
				    	<div className='col-md-6'>
				    		<CollabsPosted />
				    	</div>
				    	<div className='col-md-6'>
				    		<JobsOfInterest />
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


