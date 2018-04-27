import React, { Component } from 'react';
import { BrowserRouter as BrowserHistory, Router, Route, Link } from 'react-router-dom';
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
    e.preventDefault();
    firebase.auth().signOut();
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

export default LogoutButton;
