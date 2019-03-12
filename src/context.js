import React, { Component } from 'react';

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
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    cards: [
      {
        id: 1,
        imgUrl: `https://source.unsplash.com/random/500x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        id: 2,
        imgUrl: `https://source.unsplash.com/random/501x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        id: 3,
        imgUrl: `https://source.unsplash.com/random/502x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        id: 4,
        imgUrl: `https://source.unsplash.com/random/503x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        id: 5,
        imgUrl: `https://assets.nationbuilder.com/lifeandhope/pages/432/attachments/original/1489591854/River.jpg?1489591854`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        id: 6,
        imgUrl: `https://www.marlborough.govt.nz/repository/libraries/id:1w1mps0ir17q9sgxanf9/hierarchy/Standard%20Images%20Reusable/Watercourse_river_stream_GCI.jpg`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
