import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import SignInForm from '../Auth/login';
import { withRouter, history, Link, BrowserRouter as BrowserHistory, Route } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import AdminButton from '../ADMIN/AdminButton';

class AdminHeader extends Component {
	constructor(props){
	super(props);
	this.state = {
		authUser: null,
		isAdmin:false
		}
	}


	componentDidMount() {


	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("ADMIN").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const userDataAlt = snapshot.val();
				    if (userDataAlt) {
						this.setState({isAdmin:true});
				    } else {
				    	this.setState({isAdmin:false});
				    }
				});
	      } 
    	});	
	}


	

	render(){

		return(
			<div>			
			{this.state.authUser ? 
			<div>
				{this.state.isAdmin ?
				<div>
					<Navbar inverse collapseOnSelect>
					  <Navbar.Collapse>
					    <AdminButton />
					  </Navbar.Collapse>
					</Navbar>
				</div>
				: 
				null }
			</div>
			: null }
			</div>
		);
	}
}

export default AdminHeader;