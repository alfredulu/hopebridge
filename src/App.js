import React from "react";
import "./App.css";
import CauseCard from "./components/CauseCard";

function App() {
  return (
    <div className="app-container">
      {/* 1. Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="logo">
            HOPE<span>SHELTER</span>
          </div>
          <span className="badge">Making a Difference</span>
          <h1>
            Transform Lives Through <br />
            <span>Compassion</span>
          </h1>
          <p>
            Your generosity brings hope to those who need it most.
            <br /> Together, we create lasting change for the poor, homeless,
            and orphans.
          </p>
          <div className="hero-btns">
            <button className="btn-primary">Donate Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </header>

      {/* 2. The Mission (White Clean Section) */}
      <section className="mission-section">
        <div className="mission-wrapper">
          <span className="section-label">Our Mission</span>
          <h2>A small act of kindness can change a life forever</h2>
          <p>
            We believe every person deserves dignity and opportunity. Our
            mission is to provide essential support to the poor, shelter to the
            homeless, and a loving future for orphans.
          </p>
        </div>
      </section>

      {/* 3. Impact Stats (Overlapping the boundary) */}
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Lives Impacted</p>
          </div>
          <div className="stat-card">
            <h3>2,500+</h3>
            <p>Shelters Provided</p>
          </div>
          <div className="stat-card">
            <h3>15,000+</h3>
            <p>Meals Served</p>
          </div>
          <div className="stat-card">
            <h3>3,000+</h3>
            <p>Children Supported</p>
          </div>
        </div>
      </div>

      {/* 4. Causes Section (The Cream Background section) */}
      <section className="causes-section">
        <div className="section-header">
          <h2>Where Your Donation Goes</h2>
        </div>
        <div className="causes-container">
          <CauseCard
            title="Help the Poor"
            icon="🍲"
            description="Provide essential resources and food supplies to families."
            benefits={["Food supplies", "Medical care", "Education"]}
          />
          <CauseCard
            title="Care for Orphans"
            icon="👶"
            description="Give orphaned children a safe home and a brighter future."
            benefits={["Safe housing", "Education", "Healthcare"]}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
