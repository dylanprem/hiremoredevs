import React, { Component } from 'react';
import { BrowserRouter as BrowserHistory, Router, Route, Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase.js';
import * as routes from '../../constants/routes';
import * as firebase from 'firebase';
import './auth.css';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import PropTypes from "prop-types";


class LogoutButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser:null,
    }

    this.logout = this.logout.bind(this); 
      
  }

 
  logout(e) {
    firebase.auth().signOut();
    this.props.history.push(routes.LANDING);
    window.location.reload();
  }




  render() {

    return (
            <NavItem>
                  <button className='btn yellow-button job-text' onClick={this.logout}>Logout</button>
                  
            </NavItem>
    );
  }
}

export default withRouter(LogoutButton);
