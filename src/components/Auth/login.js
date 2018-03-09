import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import * as routes from '../../constants/routes';
import DualFeed from '../feeds/dualFeed';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

const SignInPage = (props, { history}) =>
  <div>
    <SignInForm  />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.CURRENT_FEED);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }






  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
    <div className='row'>
      <div className='col-md-6 col-md-offset-3'>
        <div className='panel-group'>
          <div className='panel panel-primary'>
            <div className='panel-heading'><h5>Already have an account? Login</h5></div>
            <div className='panel-body'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    className="form-control input-lg"
                  />
                </div>
                <div className='form-group'>
                  <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                    className="form-control input-lg"
                  />
                </div>

                <button className='btn btn-success' disabled={isInvalid} type="submit">
                  Sign In
                </button>

                { error && <p>{error.message}</p> }
              </form>
            </div>
            
          </div>
      </div>
    </div>
    <div className='col-md-6 col-md-offset-3 text-center'>
      <Link to='/pw-forget' className='btn btn-primary'>Forgot Password</Link>
    </div>

  </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};