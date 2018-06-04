import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';


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
			<ul className="nav navbar-nav">
			{this.state.authUser ?
				<li>
					{this.state.isRecruiter ?
						<Link  to='/post-job' className='signup-link job-text'>Post Job</Link>
					: null }
				</li>
				:
				null
			}
			</ul>

		);
	}
}

export default RECRUITERButton;


					        