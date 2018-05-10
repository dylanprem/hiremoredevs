import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';



class ViewJobsOfInterest extends Component{
	constructor(props){
		super(props);
		this.state = {
			JobPosts: [],
			postsFromUsers:[],
			Profiles:[],
	    	authUser: null,

		} 	
	}

	componentDidMount() {


	firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
        var postRef = firebase.database().ref('JobPosts').orderByChild('postsFromUsers/uid').equalTo(this.state.authUser.uid);
        postRef.on("child_added", snapshot => {
        	console.log(snapshot.val());
        });
	    }
	});

	}



	render(){
		return(
			<div className='row'>
				{this.state.authUser ?
			    <div className='col-md-12 text-center job-text'><h1>HELLO</h1></div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(ViewJobsOfInterest);


