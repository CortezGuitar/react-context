import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-warning text-center">404 Page Not Found</h1>
        <Link to="/" className="btn btn-primary btn-block w-50 m-auto">
          Home Page
        </Link>
      </div>
    );
  }
}
