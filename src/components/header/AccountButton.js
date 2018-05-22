import React, { Component } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import * as routes  from '../../constants/routes';


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
				<div>
					{this.state.Profiles.map((profile) => {
						return(
						<div key={profile.id}>
								{profile.uid === this.state.authUser.uid ?
									<div>
										<Link id='edit-button' className='btn yellow-button job-text hidden-sm hidden-xs' to={`/myAccount/${profile.id}`}><span className='glyphicon glyphicon-stats'></span>&nbsp;&nbsp;Account</Link>
										<Link id='edit-button' className='signup-link job-text visible-xs visible-sm' to={`/myAccount/${profile.id}`}><span className='glyphicon glyphicon-stats'></span> Account</Link>
									</div>
									: 
									null
								}
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

export default withRouter(AccountButton);