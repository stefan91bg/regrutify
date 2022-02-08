import React from 'react';
import './card.scss'
import { Link } from 'react-router-dom'

function Card(props) {

  return (
    <Link to={`/info/${props.candidateInfo.id}`}>
      <div className="single-card">
        <img className="photo" src={props.candidateInfo.avatar} alt="avatar" />
        <h3>{props.candidateInfo.name}</h3>
        <h3>{props.candidateInfo.email}</h3>
      </div>
    </Link>
  );
}

export default Card;