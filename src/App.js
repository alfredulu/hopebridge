import React, { useRef } from "react";
import "./App.css";
import CauseCard from "./components/CauseCard";
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

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <CauseCard
              title="Help the Poor"
              raised={12500}
              goal={20000}
              icon={<HandHeart size={24} />}
              image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
              description="Provide essential resources, food, and financial support to families living in poverty."
              benefits={[
                "Food supplies",
                "Medical care",
                "Education support",
                "Emergency relief",
              ]}
            />
            <CauseCard
              title="Support the Homeless"
              raised={15520}
              goal={24800}
              icon={<Home size={24} />}
              image="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600"
              description="Offer shelter, warm meals, and pathways to stability for those without a home."
              benefits={[
                "Emergency shelter",
                "Hot meals",
                "Job training",
                "Rehabilitation programs",
              ]}
            />
            <CauseCard
              title="Care for Orphans"
              raised={19590}
              goal={25000}
              icon={<Baby size={24} />}
              image="https://images.unsplash.com/photo-1536337005238-94b997371b40?w=600"
              description="Give orphaned children a safe home, education, and a brighter future."
              benefits={[
                "Safe housing",
                "Quality Education",
                "Healthcare",
                "Emotional support",
              ]}
            />
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
              making a difference. Our overhead costs are covered by separate
              grants, ensuring your donation goes directly to those who need it.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Donation Form Section */}
      <section className="donation-form-section" ref={donationRef}>
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Make Your Donation</h1>
            <p className="section-lead">
              Every contribution counts. Choose an amount below or enter your
              own.
            </p>
          </div>
          <div className="donation-card-form">
            <div className="form-inner">
              <h3>Donation Details</h3>
              <p className="form-subtitle">
                Your donation is secure and goes directly to helping those in
                need
              </p>

              <label className="input-label">Select Amount</label>
              <div className="amount-grid-options">
                <button className="amt-opt">$25</button>
                <button className="amt-opt">$50</button>
                <button className="amt-opt">$100</button>
                <button className="amt-opt">$250</button>
              </div>
              <button className="custom-amt-btn">Custom Amount</button>

              <label className="input-label">Enter Amount ($)</label>
              <input
                type="number"
                className="form-input-field"
                defaultValue="10"
              />

              <label className="input-label">Donation Category</label>
              <select className="form-input-field">
                <option>All Causes</option>
                <option>Help the Poor</option>
                <option>Support the Homeless</option>
                <option>Care for Orphans</option>
              </select>

              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="form-input-field"
                placeholder="John Doe"
              />

              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="form-input-field"
                placeholder="john@gmail.com"
              />

              <button className="complete-donation-btn">
                Complete Donation
              </button>
              <p className="tax-info">
                Your donation is tax-deductible. A receipt will be sent to your
                email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col brand-col">
              <h3>
                <Heart size={24} fill="white" className="footer-heart" />{" "}
                <div className="logo">
                  HOPE<span>BRIDGE</span>
                  <sup>&trade;</sup>
                </div>
              </h3>
              <p>
                Transforming lives through compassion and generosity. Together,
                we create lasting change.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>About Us</li>
                <li>Our Programs</li>
                <li>Impact Reports</li>
                <li>Get Involved</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <p>
                <Mail size={16} /> contact@hopebridge.org
              </p>
              <p>
                <Phone size={16} /> +1 (555) 123-4567
              </p>
              <p>
                <MapPin size={16} /> 123 Bridge Street, Hope City
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2026 HOPE<span>BRIDGE</span>
              <sup>&trade;</sup>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
