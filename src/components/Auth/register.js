import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import PostJobSeeker from '../jobseekers/PostJobSeeker';

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, firstName, lastName, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.CURRENT_FEED);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '';

    return (
      <div className='col-md-6 col-md-offset-3'>
      <div className='panel-group'>
        <div className='panel panel-info'>
          <div className='panel-heading'><h3 className='text-center'>Sign Up</h3></div>
          <div className='panel-body'>
             
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                <input
                  value={firstName}
                  onChange={event => this.setState(byPropKey('firstName', event.target.value))}
                  type="text"
                  placeholder="First Name"
                  className='form-control input-lg'
                />
                </div>
                <div className='form-group'>
                <input
                  value={lastName}
                  onChange={event => this.setState(byPropKey('lastName', event.target.value))}
                  type="text"
                  placeholder="Last Name"
                  className='form-control input-lg'
                />
                </div>
                <div className='form-group'>
                <input
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                  className='form-control input-lg'
                />
                </div>
                <div className='form-group'>
                <input
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                  className='form-control input-lg'
                />
                </div>
                <div className='form-group'>
                <input
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                  placeholder="Confirm Password"
                  className='form-control input-lg'
                />
                </div>
                
                <button className='btn btn-success' disabled={isInvalid} type="submit">
                  Sign Up
                </button>

                { error && <p>{error.message}</p> }

            </form>
      </div>
      
          </div>
        </div>
      </div>
     
    );
  }
}



export default withRouter(SignUpPage);

export {
  SignUpForm,

};