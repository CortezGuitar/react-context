import React from 'react';

export default function Card(props) {
  const { image, text, heading } = props;
  return (
    <div
      className="card m-3 border border-success"
      style={{ width: '20rem', backgroundColor: 'transparent' }}
    >
      <img className="card-img-top" src={image} alt="CardImage" />
      <div className="card-body text-white">
        <h5 className="card-title">{heading}</h5>
        <p className="card-text">{text}</p>
        <a href="../../public/index.html" className="btn btn-warning">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
