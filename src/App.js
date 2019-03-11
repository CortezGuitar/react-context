import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './context';

import Header from './components/Header';
import Footer from './components/Footer';
import CardList from './components/CardList';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Header />
            <div>
              <Switch>
                <Route exact path="/" component={CardList} />
                <Route exact path="/login" component={Login} />
                <Redirect to="/" />
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
