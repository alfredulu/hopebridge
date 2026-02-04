import React, { useRef, useState, useEffect } from "react";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import CauseCard from "./components/CauseCard";
import "./App.css";
import {
  Users,
  Home,
  Utensils,
  Heart,
  HandHeart,
  Baby,
  TrendingUp,
  Smile,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function App() {
  const donationRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        console.log("1. Starting fetch...");
        console.log("Current Database ID:", db.app.options.projectId);
        const querySnapshot = await getDocs(collection(db, "causes"));

        console.log("2. Documents found:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.log("3. Database is empty or collection name is wrong.");
        }

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("4. Final Data for State:", data);
        setCauses(data);
      } catch (error) {
        console.log("ERROR DETECTED:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleDonation = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      {/* 1. Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="logo">
            HOPE<span>BRIDGE</span>
            <sup>&trade;</sup>
          </div>
          <h1>
            Transform Lives Through <br />
            <span>Compassion</span>
          </h1>
          <p>
            Your generosity brings hope to those who need it most. <br />{" "}
            Together, we create lasting change.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={scrollToDonation}>
              Donate Now
            </button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </header>

      {/* 2. Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Our Mission</h1>
            <p className="section-lead">
              We believe every person deserves dignity, care, and opportunity.
              Our mission is to provide essential support to the poor, shelter
              and hope to the homeless, and a loving future for orphaned
              children.
            </p>
            <p className="mission-detail">
              Through your generous donations, we deliver food, shelter,
              education, and medical care to those who need it most. Every
              contribution makes a direct impact on real lives.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <div className="stats-container">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Making a Difference</h1>
            <p className="section-lead">
              See the impact of your generosity in numbers
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="icon-circle">
                <Users size={32} />
              </div>
              <h3>50,000+</h3>
              <p>Lives Impacted</p>
            </div>
            <div className="stat-card">
              <div className="icon-circle">
                <Home size={32} />
              </div>
              <h3>2,500+</h3>
              <p>Shelters Provided</p>
            </div>
            <div className="stat-card">
              <div className="icon-circle">
                <Utensils size={32} />
              </div>
              <h3>15,000+</h3>
              <p>Meals Served</p>
            </div>
            <div className="stat-card">
              <div className="icon-circle">
                <Heart size={32} />
              </div>
              <h3>3,000+</h3>
              <p>Children Supported</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Causes Section */}
      <section className="causes-section">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Where Your Donation Goes</h1>
            <p className="section-lead">
              Choose a cause that resonates with your heart, or support all
              three
            </p>
          </div>
          <div className="causes-grid">
            {loading ? (
              <p style={{ textAlign: "center", width: "100%" }}>
                Loading causes...
              </p>
            ) : causes.length > 0 ? (
              causes.map((item) => (
                <CauseCard
                  key={item.id}
                  title={item.title}
                  raised={item.raised || 0}
                  goal={item.goal || 1000}
                  icon={<Heart size={24} />}
                  image={item.image}
                  description={item.description}
                  benefits={item.benefits || []}
                />
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                No active causes found.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">How It Works</h1>
            <p className="section-lead">
              Your journey from donation to impact in three simple steps
            </p>
          </div>
          <div className="steps-wrapper">
            <div className="step-item">
              <div className="icon-wrapper">
                <HandHeart size={32} />
              </div>
              <h3>You Donate</h3>
              <p>
                Choose an amount and select the cause closest to your heart.
                Every dollar counts.
              </p>
            </div>
            <div className="step-item">
              <div className="icon-wrapper">
                <TrendingUp size={32} />
              </div>
              <h3>We Distribute</h3>
              <p>
                100% of your donation goes directly to programs that help those
                in need.
              </p>
            </div>
            <div className="step-item">
              <div className="icon-wrapper">
                <Smile size={32} />
              </div>
              <h3>Lives Transform</h3>
              <p>
                See the impact through regular updates and stories of hope and
                recovery.
              </p>
            </div>
          </div>
          <div className="transparency-card">
            <h3>100% Transparency</h3>
            <p>
              We believe in complete transparency. Every donation is tracked,
              and you'll receive regular updates on how your contribution is
              making a difference.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Donation Form Section */}
      <section className="donation-form-section" ref={donationRef}>
        <div className="container">
          <div className="donation-card-form">
            {!submitted ? (
              <form onSubmit={handleDonation}>
                <div className="form-inner">
                  <h3>Donation Details</h3>
                  <label className="input-label">Select Amount</label>
                  <div className="amount-grid-options">
                    <button type="button" className="amt-opt">
                      $25
                    </button>
                    <button type="button" className="amt-opt">
                      $50
                    </button>
                    <button type="button" className="amt-opt">
                      $100
                    </button>
                  </div>
                  <input
                    type="number"
                    className="form-input-field"
                    placeholder="Enter Amount ($)"
                    required
                  />
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="email"
                    className="form-input-field"
                    placeholder="Email Address"
                    required
                  />
                  <button type="submit" className="complete-donation-btn">
                    Complete Donation
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Heart size={48} color="#2d5a3c" fill="#2d5a3c" />
                <h2>Thank You, Hero!</h2>
                <button
                  className="btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Make Another Donation
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2026 HOPE BRIDGE™. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
