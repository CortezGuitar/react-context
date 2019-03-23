import React, { Component } from 'react';

import { Provider, MyContext } from './context';
import App from './App';
export default class Data extends Component {
  render() {
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}

Data.contextType = MyContext;
