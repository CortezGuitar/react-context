import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer, MyContext } from '../../context';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  onLogoutHandler = dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    dispatch({ type: 'AUTH_LOGOUT', payload: { token: null, localId: null } });
    this.props.history.push('/auth');
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md bg-success navbar-dark shadow-sm">
        <div className="container p-1">
          <a
            href="http://context-react-bootstrap.firebaseapp.com"
            className="navbar-brand"
          >
            <h2>
              <span className="text-warning">
                <i className="fab fa-react" />
              </span>{' '}
              Context-Bootstrap
            </h2>
          </a>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <h4>Home</h4>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/auth" className="nav-link">
                  <h4>Sign Up/In</h4>
                </Link>
              </li>
              <Consumer>
                {value => {
                  const { dispatch } = value;
                  return (
                    <li
                      className="nav-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.onLogoutHandler(dispatch)}
                    >
                      {this.context.auth.token !== null ? (
                        <button className="btn btn-lg nav-link text-warning bg-success">
                          <p className="h4">Logout</p>
                        </button>
                      ) : null}
                    </li>
                  );
                }}
              </Consumer>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

Header.contextType = MyContext;
