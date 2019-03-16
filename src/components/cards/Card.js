import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

export default class Card extends Component {
  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({ type: 'DELETE_CARD', payload: id });
  };

  render() {
    const { image, text, heading, id } = this.props;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div
              className="card m-3 border border-warning"
              style={{ width: '20rem', backgroundColor: 'transparent' }}
            >
              <img className="card-img-top" src={image} alt="CardImage" />
              <div className="card-body text-white">
                <h5 className="card-title">{heading}</h5>
                <p className="card-text">{text}</p>
                <button
                  className="btn btn-warning btn-block"
                  onClick={() => this.onDeleteClick(id, dispatch)}
                >
                  <span>
                    <i className="far fa-trash-alt" />
                  </span>{' '}
                  Remove
                </button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
