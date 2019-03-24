import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import { Consumer, MyContext } from '../../context';

class CardList extends Component {
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
