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
      {/* 🎗️ The Ribbon - Moved inside the card to ensure visibility */}
      {isGoalMet && (
        <div className="goal-ribbon" style={{ zIndex: 100 }}>
          MISSION ACCOMPLISHED 🎉
        </div>
      )}

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

          {/* 📈 Goal Progress Text */}
          <div
            className="goal-text"
            style={{ marginTop: "10px", fontWeight: "600" }}
          >
            {isGoalMet ? (
              <span style={{ color: "#2d5a3c" }}>
                Goal fully funded! Thank you!
              </span>
            ) : (
              <span style={{ color: "#c76d5a" }}>
                Only ${remaining.toLocaleString()} left to reach the goal!
              </span>
            )}
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
