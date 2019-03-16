import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-success navbar-dark shadow-sm">
        <div className="container p-1">
          <a href="http://localhost:3000" className="navbar-brand">
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
                <Link to="/login" className="nav-link">
                  <h4>Login/Register</h4>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
