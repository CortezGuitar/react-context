import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './context';

import Header from './components/Header';
import Footer from './components/Footer';
import CardList from './components/CardList';

class App extends Component {
  render() {
    return (
      <Provider>
        <div>
          <Header />
          <CardList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
