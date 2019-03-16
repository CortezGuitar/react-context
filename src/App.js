import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import background from './img/photo-1445358899385-5d4b6bbe0acb.jpg';

import { Provider } from './context';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CardList from './components/cards/CardList';
import Login from './components/login/Login';
import AddCard from './components/cards/AddCard';
import NotFound from './components/pages/NotFound';

class App extends Component {
  render() {
    const overlay = {
      position: 'relative',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: '2',
      minHeight: `800px`
    };

    return (
      <Provider>
        <Router>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: `cover`,
              minHeight: `800px`,
              height: `100%`,
              position: 'relative'
            }}
          >
            <Header />
            <div style={overlay}>
              <Switch>
                <Route exact path="/" component={CardList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/addcard" component={AddCard} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
