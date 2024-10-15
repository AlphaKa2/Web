import React from "react";
import './Card.css';

function Card({ plan }) {
  return (
    <div className="card1">
      <img src={`${process.env.PUBLIC_URL}/ocean2.png`} className="card-img1" alt="Card background" />
      <h3 className="card-title1">{plan.title}</h3>
      <p className="card-description1">{plan.description}</p>
      <div className="card-footer1">
        <div className="card-user1">
          <img src={`${process.env.PUBLIC_URL}/default.png`} className="user-profile-img1" alt="User profile" />
          <div className="user-info1">
            <span className="user-nickname1">제주 탐험가</span>
            <p className="card-date1">{plan.date}</p>
          </div>
        </div>
        <div className="card-reactions1">
          <span>❤️ {plan.likes}</span>
          <span>💬 {plan.comments}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
