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
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    cards: [],
    auth: { token: '', localId: '' },
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const resp = await axios.get(`/cards.json?auth=${this.state.auth.token}`);
    const fetchedOrders = [];
    for (let key in resp.data) {
      fetchedOrders.push({
        id: key,
        ...resp.data[key]
      });
    }

    this.setState({ cards: fetchedOrders });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.auth.token !== prevState.auth.token) {
      const resp = await axios.get(`/cards.json?auth=${this.state.auth.token}`);
      const fetchedOrders = [];
      for (let key in resp.data) {
        fetchedOrders.push({
          id: key,
          ...resp.data[key]
        });
        this.setState({ cards: fetchedOrders });
      }
    }
  }

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
