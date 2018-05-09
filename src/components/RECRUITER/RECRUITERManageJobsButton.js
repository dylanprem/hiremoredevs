import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes  from '../../constants/routes';
import SignInForm from '../Auth/login';


class RECRUITERManageJobsButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			RECRUITER:[],
			
		}
	}


	

	componentDidMount(){
    	const recruiterRef = firebase.database().ref('RECRUITER');
	        recruiterRef.once('value', (snapshot) => {		
			    let RECRUITER = snapshot.val();
			    let newState = [];
			    for (let r in RECRUITER){
			      newState.push({
			        id: r,
					uid:RECRUITER[r].uid,
			      });

			    }
			    this.setState({
			      RECRUITER: newState
			    });
			  });

		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });

	        
			} 
    	});	
	}


	

	render() {
		return (
			<div>
			{this.state.authUser ?
				<div>
					{this.state.RECRUITER.map((r) => {
						return(
					      <div eventKey={1} key={r.id}>
					      	{r.uid === this.state.authUser.uid ?
					      	<div>
					        <Link to='/view-posted-jobs' className='btn yellow-button job-text hidden-sm hidden-xs'><span className='glyphicon glyphicon-cog'></span> Manage Jobs</Link>
					        <Link to='/view-posted-jobs' className='signup-link job-text visible-sm visible-xs'><span className='glyphicon glyphicon-cog'></span> Manage Jobs</Link>
					        </div>
					        :
					        null }
					      </div>
						);
					})}
				</div>
				:
				null
			}
			</div>

		);
	}
}

export default RECRUITERManageJobsButton;


					        