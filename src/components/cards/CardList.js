import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import { Consumer, MyContext } from '../../context';

class CardList extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.context.dispatch({
        type: 'AUTH_LOGOUT',
        payload: { token: null, localId: null }
      });
      this.props.history.push('/auth');
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate < new Date()) {
        this.context.dispatch({
          type: 'AUTH_LOGOUT',
          payload: { token: null, localId: null }
        });
        this.props.history.push('/auth');
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
    return (
      <div>
        <div className="container pt-3">
          <Link
            to="/card/add"
            className="btn btn-primary btn-block w-50 m-auto"
          >
            <h4>New Card</h4>
          </Link>
        </div>

        <div className="container d-flex flex-wrap justify-content-around p-0">
          <Consumer>
            {value => {
              const { cards } = value;
              if (cards) {
                return (
                  <React.Fragment>
                    {cards.map(card => (
                      <Card
                        key={card.id}
                        image={card.imgUrl}
                        heading={card.heading}
                        text={card.text}
                        id={card.id}
                      />
                    ))}
                  </React.Fragment>
                );
              }
            }}
          </Consumer>
        </div>
      </div>
    );
  }
}

export default CardList;

CardList.contextType = MyContext;
