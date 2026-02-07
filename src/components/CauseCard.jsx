import React from "react";

const CauseCard = ({
  title,
  description,
  benefits,
  icon,
  image,
  raised,
  goal,
  onDonateClick,
}) => {
  const percentage = Math.round((raised / goal) * 100);
  const isGoalMet = raised >= goal;
  const remaining = goal - raised;

  return (
    <div className="cause-card" style={{ position: "relative" }}>
      {isGoalMet && <div className="goal-ribbon">MISSION ACCOMPLISHED 🎉</div>}

      <div className="card-img-container">
        <img src={image} className="card-img" alt={title} />
        <div className="image-fade-overlay"></div>
      </div>

      <div className="card-body">
        <div className="icon-circle-floating">{icon}</div>
        <h3
          style={{
            color: "var(--dark-green)",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "var(--light-green)",
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>

        <ul
          style={{
            paddingLeft: "20px",
            color: "var(--light-green)",
            margin: "15px 0",
          }}
        >
          {benefits &&
            benefits.map((item, index) => (
              <li
                key={index}
                style={{ marginBottom: "5px", fontSize: "0.9rem" }}
              >
                {item}
              </li>
            ))}
        </ul>

        <div className="progress-container" style={{ margin: "20px 0" }}>
          <div className="progress-stats">
            <span>Raised: ${Number(raised).toLocaleString()}</span>
            <span>{percentage}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${percentage > 100 ? 100 : percentage}%`,
                backgroundColor: isGoalMet ? "#2d5a3c" : "#c76d5a",
              }}
            ></div>
          </div>
          <div
            className="goal-text"
            style={{ marginTop: "10px", fontSize: "0.85rem" }}
          >
            {isGoalMet
              ? "Goal met!"
              : `Only $${remaining.toLocaleString()} left!`}
          </div>
        </div>

        <button className="donate-cause-btn" onClick={onDonateClick}>
          Donate to this cause
        </button>
      </div>
    </div>
  );
};

export default CauseCard;
