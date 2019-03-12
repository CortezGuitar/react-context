import React, { Component } from 'react';
import { Consumer } from '../../context';

import uuid from 'uuid';

export default class AddCard extends Component {
  state = {
    imgUrl: '',
    heading: '',
    text: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { imgUrl, heading, text } = this.state;

    const newCard = {
      imgUrl,
      heading,
      text,
      id: uuid()
    };

    dispatch({ type: 'ADD_CARD', payload: newCard });
    this.props.history.push('/');
  };

  render() {
    const { imgUrl, heading, text } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="container pt-5">
              <div
                className="card border border-success text-white"
                style={{ backgroundColor: 'transparent' }}
              >
                <div className="card-header bg-success">
                  <h3>New Card</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={e => this.onSubmit(dispatch, e)}>
                    <div className="form-group">
                      <label htmlFor="imgUrl">Image URL</label>
                      <input
                        type="text"
                        name="imgUrl"
                        className="form-control form-control-lg"
                        placeholder="Enter Image URL..."
                        value={imgUrl}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="imgUrl">Heading</label>
                      <input
                        type="text"
                        name="heading"
                        className="form-control form-control-lg"
                        placeholder="Enter Card Heading..."
                        value={heading}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="imgUrl">Description</label>
                      <textarea
                        type="text"
                        name="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Card Description..."
                        value={text}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="d-flex justify-content-around">
                      <input
                        type="submit"
                        value="Add Card"
                        className="btn btn-lg btn-success btn-block m-0 mr-1"
                      />
                      <input
                        type="button"
                        value="Back"
                        className="btn btn-lg btn-secondary btn-block m-0 ml-1"
                        onClick={() => this.props.history.goBack()}
                      />
                    </div>
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
