import React, { Component } from 'react';
import './Auth.css';

import axios from 'axios';
import { Consumer } from '../../context';

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    isSignUp: true
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { email, password, isSignUp } = this.state;

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (password === '') {
      this.setState({ errors: { password: 'Password is required' } });
      return;
    }

    const newUser = { email, password, returnSecureToken: true };

    let url = '';

    if (isSignUp) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBmtETju1J-7BEmrbZ5yAPrRiA-jEGiNcI`;
    } else {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBmtETju1J-7BEmrbZ5yAPrRiA-jEGiNcI`;
    }

    const resp = await axios.post(url, newUser);
    const expDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);

    dispatch({
      type: 'AUTH_LOGIN',
      payload: { token: resp.data.idToken, localId: resp.data.localId }
    });

    localStorage.setItem('token', resp.data.idToken);
    localStorage.setItem('expDate', expDate);
    localStorage.setItem('userId', resp.data.localId);

    this.setState({ errors: {} });

    this.props.history.push('/');
  };

  onSwitchHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const { errors, isSignUp } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="login container pt-5">
              <div className="card border-0">
                <div
                  className={
                    isSignUp
                      ? 'card-header bg-warning'
                      : 'card-header bg-primary text-white'
                  }
                >
                  <h3 className={isSignUp ? 'float-left' : 'float-right'}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={e => this.onSubmit(dispatch, e)}>
                    <div className="form-group">
                      <label htmlFor="Email">Email address</label>
                      <input
                        type="email"
                        className={
                          'form-control form-control-lg ' +
                          (errors.email ? 'is-invalid' : '')
                        }
                        id="Email"
                        placeholder="Enter email"
                        name="email"
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email">Password</label>
                      <input
                        type="password"
                        className={
                          'form-control form-control-lg ' +
                          (errors.password ? 'is-invalid' : '')
                        }
                        id="Password"
                        placeholder="Password"
                        name="password"
                        minLength="5"
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">{errors.password}</div>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-lg btn-warning mb-2"
                    />
                    <input
                      type="button"
                      value="Sign In/Up"
                      className="btn btn-lg btn-primary mb-2 ml-3"
                      onClick={this.onSwitchHandler}
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
