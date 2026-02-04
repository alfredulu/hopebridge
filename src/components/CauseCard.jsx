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
  const isGoalMet = raised >= goal;

  return (
    <div className={`cause-card ${isGoalMet ? "goal-met-border" : ""}`}>
      {/* 1. The Ribbon logic */}
      {isGoalMet && <div className="goal-ribbon">Goal Reached! 🎉</div>}

      <div className="card-img-container">
        <img src={image} className="card-img" alt={title} />
        <div className="image-fade-overlay"></div>
      </div>

      <div className="card-body">
        <div className="icon-circle-floating">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="progress-container" style={{ margin: "20px 0" }}>
          <div className="progress-stats">
            <span>Raised: ${raised.toLocaleString()}</span>
            <span>{percentage}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
            ></div>
          </div>
          <div className="goal-text">Goal: ${goal.toLocaleString()}</div>
        </div>

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
