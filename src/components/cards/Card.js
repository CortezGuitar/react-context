import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context';
import axios from '../../axios-orders';

export default class Card extends Component {
  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`/cards.json?${id}`);

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
                <div className="d-flex">
                  <button
                    className="btn btn-warning w-75 mr-1"
                    onClick={() => this.onDeleteClick(id, dispatch)}
                  >
                    <span>
                      <i className="far fa-trash-alt" />
                    </span>{' '}
                    Remove
                  </button>

                  <Link to={`card/edit/${id}`} className="btn btn-success w-25">
                    <span>
                      <i className="fas fa-edit" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
