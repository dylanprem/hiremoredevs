import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';
import SignInForm from '../Auth/login';


class RECRUITERButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			RECRUITER:[],
			isRecruiter: false
			
		}
	}


	

	componentDidMount(){
		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("RECRUITER").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isRecruiter:true});
				    } else {
				    	this.setState({isRecruiter:false});
				    }
				});
	        
			} 
    	});	
	}


	

	render() {
		return (
			<div>
			{this.state.authUser ?
				<div>
					{this.state.isRecruiter ?
					      <div>
					        <Link to='/post-job' className='signup-link job-text'> Post Job Ad</Link>
					      </div>
					: null }
				</div>
				:
				null
			}
			</div>

		);
	}
}

export default RECRUITERButton;


					        