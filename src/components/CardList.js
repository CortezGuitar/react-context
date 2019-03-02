import React, { Component } from 'react';

import background from '../img/photo-1445358899385-5d4b6bbe0acb.jpg';

import Card from './Card';
import { Consumer } from '../context';

class CardList extends Component {
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
      zIndex: '2'
    };

    return (
      <div
        className="container-fluid p-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: `cover`,
          minHeight: `800px`,
          height: `100%`,
          position: 'relative'
        }}
      >
        <div style={overlay}>
          <div className="container d-flex flex-wrap justify-content-around p-0">
            <Consumer>
              {value => {
                const { cards } = value;
                return (
                  <React.Fragment>
                    {cards.map((card, index) => (
                      <Card
                        key={index}
                        image={card.imgUrl}
                        heading={card.heading}
                        text={card.text}
                      />
                    ))}
                  </React.Fragment>
                );
              }}
            </Consumer>
          </div>
        </div>
      </div>
    );
  }
}

export default CardList;
