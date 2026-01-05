import React from "react";

const CauseCard = ({
  title,
  description,
  benefits,
  icon,
  image,
  raised,
  goal,
}) => {
  const percentage = Math.round((raised / goal) * 100);

  return (
    <div className="cause-card">
      <img src={image} className="card-img" alt={title} />
      <div className="card-body">
        <div className="icon-circle-floating">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <ul
          className="cause-list"
          style={{
            paddingLeft: "20px",
            color: "#48783c",
            marginBottom: "20px",
          }}
        >
          {benefits.map((benefit, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {benefit}
            </li>
          ))}
        </ul>
        <button className="donate-cause-btn">Donate to this cause</button>
      </div>
    </div>
  );
};

export default CauseCard;
