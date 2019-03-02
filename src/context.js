import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    cards: [
      {
        imgUrl: `https://source.unsplash.com/random/500x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        imgUrl: `https://source.unsplash.com/random/501x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        imgUrl: `https://source.unsplash.com/random/502x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        imgUrl: `https://source.unsplash.com/random/503x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        imgUrl: `https://source.unsplash.com/random/504x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      },
      {
        imgUrl: `https://source.unsplash.com/random/505x300`,
        heading: `Lorem ipsum.`,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, eligendi.`
      }
    ]
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
