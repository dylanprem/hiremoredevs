import React, { Component } from 'react';
import * as firebase from 'firebase';
import {  Link, withRouter } from 'react-router-dom';


class AccountButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			authUser:null,
			Profiles:[],
		}
	}	

	componentDidMount(){
		const profilesRef = firebase.database().ref('Profiles');
		profilesRef.once('value', (snapshot) => {		
		    let Profiles = snapshot.val();
		    let newState = [];
		    for (let profile in Profiles){
		      newState.push({
		        id: profile,
				uid:Profiles[profile].uid,
		      });
			}
		    this.setState({
		      Profiles: newState
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
			<ul className="nav navbar-nav">
				{this.state.Profiles.map((profile) => {return(
				<li key={profile.id}>
				{profile.uid === this.state.authUser.uid ?
				<Link  key={profile.id} id='edit-button' className='signup-link job-text' to={`/myAccount/${profile.id}`}><span className='glyphicon glyphicon-stats'></span>&nbsp;&nbsp;Account</Link>
				: null }

				</li>
				   );
				})}		
			</ul>
			: null }
			</div>

		);
	}
}

export default withRouter(AccountButton);