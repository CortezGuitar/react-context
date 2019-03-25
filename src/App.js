import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import background from './img/photo-1445358899385-5d4b6bbe0acb.jpg';

import { MyContext } from './context';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CardList from './components/cards/CardList';
import Auth from './components/auth/Auth';
import AddCard from './components/cards/AddCard';
import EditCard from './components/cards/EditCard';
import NotFound from './components/pages/NotFound';

export default class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.context.dispatch({
        type: 'AUTH_LOGOUT',
        payload: { token: null, localId: null }
      });
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate < new Date()) {
        this.context.dispatch({
          type: 'AUTH_LOGOUT',
          payload: { token: null, localId: null }
        });
      } else {
        const localId = localStorage.getItem('userId');
        this.context.dispatch({
          type: 'AUTH_LOGIN',
          payload: { token: token, localId: localId }
        });
      }
    }
  }

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
    let routes = (
      <Switch>
        <Route exact path="/" component={CardList} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/card/add" component={AddCard} />
        <Route exact path="/card/edit/:id" component={EditCard} />
        <Route component={NotFound} />
        <Redirect to="/" />
      </Switch>
    );

    if (!this.context.auth.token) {
      routes = (
        <Switch>
          <Route exact path="/" component={CardList} />
          <Route exact path="/auth" component={Auth} />
          <Redirect to="/auth" />
          <Route component={NotFound} />
        </Switch>
      );
    }

    return (
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
          <div style={overlay}>{routes}</div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.contextType = MyContext;
