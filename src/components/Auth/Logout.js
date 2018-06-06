import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import * as firebase from 'firebase';
import './auth.css';
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
           <form className="navbar-form navbar-right">
            <button className='btn yellow-button job-text' onClick={this.logout}>Logout</button>
          </form>
              
         
    );
  }
}

export default withRouter(LogoutButton);
