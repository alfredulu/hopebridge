import React from "react";

const CauseCard = ({ title, description, benefits, icon }) => {
  return (
    <div className="cause-card">
      <img
        src="https://placehold.co/600x400?text=Cause+Image"
        className="card-img"
        alt={title}
      />
      <div className="card-body">
        <div className="icon-box">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="cause-list">
          {benefits.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="donate-cause-btn">Donate to this cause</button>
      </div>
    </div>
  );
};

export default CauseCard;
