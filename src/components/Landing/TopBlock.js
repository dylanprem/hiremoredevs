import React, { Component } from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes'; 
import * as firebase from 'firebase';

class TopBlock extends Component {
	constructor(props) {
    super(props);
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
			<div className='row employers-img' >
				<div className='col-md-12 opacity'>
					<div className='col-md-12 inner text-center'>
						<h1 className='text-center landingLogo'>HireMoreDevs</h1>
						{this.state.authUser ? null : <Link to={routes.SIGN_IN} className='job-text signup-link non-auth-link'>Login/Signup</Link>}
					</div>
				</div>
			</div>
		);
	}
}


export default TopBlock;