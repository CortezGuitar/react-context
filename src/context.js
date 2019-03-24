import React, { Component } from 'react';
import axios from './axios-orders';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload)
      };
    case 'ADD_CARD':
      return {
        ...state,
        cards: [action.payload, ...state.cards]
      };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id ? (card = action.payload) : card
        )
      };
    case 'AUTH_LOGIN':
      return {
        ...state,
        auth: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        auth: action.payload,
        cards: []
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    cards: [],
    auth: { token: null, localId: null, expDate: null },
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const auth = {
      token: localStorage.getItem('token'),
      localId: localStorage.getItem('userId'),
      expDate: new Date(localStorage.getItem('expDate'))
    };

    if (auth.expDate < new Date()) {
      auth.token = null;
    }

    const queryParams = `?auth=${auth.token}&orderBy="userId"&equalTo="${
      auth.localId
    }"`;

    const resp = await axios.get(`/cards.json${queryParams}`);

    this.refreshCards(resp, auth);
  }

  refreshCards = (resp, auth) => {
    const fetchedOrders = [];
    for (let key in resp.data) {
      fetchedOrders.push({
        id: key,
        ...resp.data[key]
      });
    }
    this.setState({ auth, cards: fetchedOrders });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const MyContext = Context;

export const Consumer = Context.Consumer;
