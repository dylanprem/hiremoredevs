import React, { Component } from 'react';

import { auth } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
<div className='col-md-6 col-md-offset-3'>
  <div className='panel-group'>
    <div className='panel panel-primary'>
      <div className='panel-heading'><h5>Change my password</h5></div>
      <div className='panel-body'>
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="New Password"
            className='form-control input-lg'
          />
        </div>
        <div className='form-group'>
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm New Password"
            className='form-control input-lg'
          />
        </div>
        <button disabled={isInvalid} type="submit" className='btn btn-danger'>
          Update Password
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

export default PasswordChangeForm;