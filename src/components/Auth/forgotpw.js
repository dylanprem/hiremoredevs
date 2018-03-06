import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';

const PasswordForgetPage = () =>
  <div>
    <p className='text-center text-muted'>Please enter the email address that you used when you signed up.</p>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
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
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
<div className='col-md-6 col-md-offset-3'>
  <div className='panel-group'>
    <div className='panel panel-primary'>
      <div className='panel-heading'><h5>Reset Password</h5></div>
      <div className='panel-body'>
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
          className="form-control input-lg"
        />
        </div>
        <button disabled={isInvalid} type="submit" className="btn btn-success">
          Reset My Password
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

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};