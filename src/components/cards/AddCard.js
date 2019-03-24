import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from '../../axios-orders';
import { Redirect } from 'react-router-dom';

export default class AddCard extends Component {
  state = {
    imgUrl: '',
    heading: '',
    text: '',
    errors: {},
    toDashboard: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, auth, e) => {
    e.preventDefault();

    const { imgUrl, heading, text } = this.state;

    if (imgUrl === '') {
      this.setState({ errors: { imgUrl: 'Image URL is required' } });
      return;
    }

    if (heading === '') {
      this.setState({ errors: { heading: 'Heading is required' } });
      return;
    }

    if (text === '') {
      this.setState({ errors: { text: 'Description is required' } });
      return;
    }

    const newCard = {
      heading,
      imgUrl,
      text,
      userId: auth.localId
    };

    const resp = await axios.post(`/cards.json?auth=${auth.token}`, newCard);

    dispatch({ type: 'ADD_CARD', payload: { ...newCard, id: resp.data.name } });

    this.setState({ errors: {}, toDashboard: true });
  };

  render() {
    const { imgUrl, heading, text, errors } = this.state;
    if (this.state.toDashboard) {
      return <Redirect to="/" />;
    }
    return (
      <Consumer>
        {value => {
          const { dispatch, auth } = value;
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
                  <form onSubmit={e => this.onSubmit(dispatch, auth, e)}>
                    <div className="form-group">
                      <label htmlFor="imgUrl">Image URL</label>
                      <input
                        type="text"
                        name="imgUrl"
                        className={
                          'form-control form-control-lg ' +
                          (errors.imgUrl ? 'is-invalid' : '')
                        }
                        placeholder="Enter Image URL..."
                        value={imgUrl}
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">{errors.imgUrl}</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="heading">Heading</label>
                      <input
                        type="text"
                        name="heading"
                        className={
                          'form-control form-control-lg ' +
                          (errors.heading ? 'is-invalid' : '')
                        }
                        placeholder="Enter Card Heading..."
                        value={heading}
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">{errors.heading}</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Description</label>
                      <textarea
                        type="text"
                        name="text"
                        className={
                          'form-control form-control-lg ' +
                          (errors.text ? 'is-invalid' : '')
                        }
                        placeholder="Enter Card Description..."
                        value={text}
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">{errors.text}</div>
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
