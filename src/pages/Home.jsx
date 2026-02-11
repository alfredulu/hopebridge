import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CauseCard from "../components/CauseCard";
import {
  HandHeart,
  TrendingUp,
  Smile,
  Users,
  Home as HomeIcon,
  Utensils,
  Heart,
} from "lucide-react";
import "./Home.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Home = ({
  causes,
  loading,
  iconMap,
  scrollToDonation,
  setSelectedCause,
  selectedCause,
  donationRef,
  handleDonation,
  submitted,
  setSubmitted,
  formError,
  setFormError,
  amountInputRef,
  amountValue,
  setAmountValue,
  isProcessing,
  recentDonations,
  getCleanFirstName,
  galleryImages,
  selectedImg,
  setSelectedImg,
}) => {
  const { hash } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  // 1. NEW: State to control the dropdown and summary text
  const [formCategory, setFormCategory] = useState("All Causes");

  // 2. NEW: Ref to focus the dropdown
  const categorySelectRef = useRef(null);

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  // 3. NEW: Helper to handle remote clicks (from Cards or Modal)
  const handleRemoteDonateClick = (causeTitle) => {
    setFormCategory(causeTitle); // Set the dropdown value
    scrollToDonation(); // Scroll to form

    // Focus the dropdown after scroll so user sees it "hovered/active"
    setTimeout(() => {
      if (categorySelectRef.current) {
        categorySelectRef.current.focus();
      }
    }, 800);
  };

  return (
    <>
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
            <Link to="/info#about-us" className="btn-secondary">
              Learn More
            </Link>
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
      <div id="stats" className="stats-container">
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
                <HomeIcon size={32} />
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
      <section id="causes" className="causes-section">
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
            ) : (
              causes.map((cause) => (
                <CauseCard
                  key={cause.id}
                  {...cause}
                  title={cause.title}
                  raised={cause.raised}
                  goal={cause.goal}
                  icon={iconMap[cause.title] || <Heart size={24} />}
                  image={cause.image}
                  description={cause.description}
                  benefits={cause.benefits || []}
                  onDonateClick={scrollToDonation}
                  onImageClick={() => setSelectedCause(cause)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">How it works</h1>
            <p className="section-lead">
              Your journey from donation to impact in three simple steps
            </p>
          </div>

          <div className="steps-wrapper">
            <div className="step-line"></div>{" "}
            <div className="step-item">
              <div className="icon-wrapper">
                <HandHeart size={32} />
              </div>
              <h3>You Donate</h3>
              <p>
                Choose an amount and select the cause closest to your heart.
                Every dollar counts
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

          {/* 💎 100% Transparency Box */}
          <div className="transparency-box">
            <h2>100% Transparency</h2>
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
      <section
        id="donation-form"
        className="donation-form-section"
        ref={donationRef}
      >
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Make Your Donation</h1>
            <p className="section-lead">
              Every contribution counts. Choose an amount below or enter your
              own.
            </p>
          </div>
          <div className="donation-card-form">
            {!submitted ? (
              <form onSubmit={handleDonation}>
                <div className="form-inner">
                  <h3>Donation Details</h3>
                  <p className="form-subtitle">
                    Your info helps us send your tax-deductible receipt and
                    impact updates.
                  </p>

                  <label className="input-label">Select Amount</label>
                  <div className="amount-grid-options">
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className="amt-opt"
                        onClick={() => {
                          setAmountValue(amt);
                          setFormError("");
                        }}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="custom-amt-btn"
                    onClick={() => {
                      setAmountValue("");
                      amountInputRef.current.focus();
                    }}
                  >
                    Custom Amount
                  </button>

                  <label className="input-label">Enter Amount ($)</label>
                  <input
                    ref={amountInputRef}
                    type="number"
                    name="amount"
                    className="form-input-field"
                    placeholder="Minimum $10"
                    required
                    value={amountValue}
                    onChange={(e) => setAmountValue(e.target.value)} // Allow typing too
                    onFocus={() => setFormError("")}
                  />

                  <label className="input-label">Donation Category</label>
                  <select
                    name="category"
                    className="form-input-field"
                    value={formCategory}
                    ref={categorySelectRef}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="All Causes">All Causes</option>
                    {causes.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>

                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input-field"
                    placeholder="Enter your full name"
                    required
                  />

                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input-field"
                    placeholder="yourname@example.com"
                    required
                  />

                  {formError && (
                    <div className="form-warning">
                      <span className="warning-icon">⚠️</span> {formError}
                    </div>
                  )}

                  <div
                    className="payment-area"
                    style={{
                      marginTop: "30px",
                      borderTop: "1px solid #eee",
                      paddingTop: "20px",
                    }}
                  >
                    <label className="input-label">Select Payment Method</label>
                    <div className="payment-selector-grid">
                      <button
                        type="button"
                        className={`pay-method-btn ${
                          paymentMethod === "card" ? "active" : ""
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        💳 Credit Card
                      </button>
                      <button
                        type="button"
                        className={`pay-method-btn ${
                          paymentMethod === "paypal" ? "active" : ""
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        🅿️ PayPal
                      </button>
                      <button
                        type="button"
                        className={`pay-method-btn ${
                          paymentMethod === "crypto" ? "active" : ""
                        }`}
                        onClick={() => setPaymentMethod("crypto")}
                      >
                        ₿ Crypto
                      </button>
                    </div>

                    {/* --- Donation Summary --- */}
                    <div className="donation-summary-box">
                      <div className="summary-row">
                        <span>Giving to:</span>
                        <strong>
                          {formCategory === "All Causes"
                            ? "General Fund"
                            : formCategory}
                        </strong>
                      </div>
                      <div className="summary-row">
                        <span>Total Amount:</span>
                        <span className="summary-total">
                          ${amountValue || "0"}
                        </span>
                      </div>
                    </div>

                    <div className="gateway-display-box">
                      {paymentMethod === "card" && (
                        <div className="mock-card-form">
                          <p className="gateway-hint">
                            Pay securely via Integrated Card Field
                          </p>
                          <div className="placeholder-input">Card Number</div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <div
                              className="placeholder-input"
                              style={{ flex: 1 }}
                            >
                              MM/YY
                            </div>
                            <div
                              className="placeholder-input"
                              style={{ flex: 1 }}
                            >
                              CVC
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "paypal" && (
                        <div className="mock-paypal">
                          <div className="placeholder-paypal-btn">
                            PayPal Button Placeholder
                          </div>
                        </div>
                      )}

                      {paymentMethod === "crypto" && (
                        <button type="button" className="crypto-pay-btn">
                          Donate with Bitcoin / USDT
                        </button>
                      )}
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <button
                      type="submit"
                      className="complete-donation-btn"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="spinner-container">
                          <div className="btn-spinner"></div> Processing...
                        </span>
                      ) : (
                        "Complete Donation"
                      )}
                    </button>
                  )}

                  <p className="tax-info">
                    Your donation is tax-deductible. A receipt will be sent to
                    your email.
                  </p>
                </div>
              </form>
            ) : (
              <div
                className="thank-you-message"
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "400px",
                  justifyContent: "center",
                }}
              >
                <Heart size={48} color="#2d5a3c" fill="#2d5a3c" />
                <h2 style={{ marginTop: "20px" }}>Thank You, Hero!</h2>
                <p>
                  Your generous gift has been received. Together, we are
                  building a bridge to a better future.
                </p>

                <button
                  className="btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setIsProcessing(false);
                  }}
                >
                  Make Another Donation
                </button>

                <hr
                  style={{
                    width: "100%",
                    border: "0.5px solid #eee",
                    margin: "20px 0",
                  }}
                />

                <div className="recent-donations" style={{ width: "100%" }}>
                  <h4 style={{ color: "#2d5a3c", marginBottom: "15px" }}>
                    Recent Supporters
                  </h4>
                  <div className="donation-list">
                    {recentDonations.length > 0 ? (
                      recentDonations.map((don, index) => (
                        <div
                          key={index}
                          className="donation-item"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "10px",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {Number(don.amount) >= 500 && (
                              <span title="Top Donor">👑</span>
                            )}
                            {/* 🧹 Use the cleaner function here */}
                            {getCleanFirstName(don.donorName)}
                          </span>
                          <span style={{ fontWeight: "bold" }}>
                            ${Number(don.amount).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontStyle: "italic", color: "#666" }}>
                        Be the first to appear here!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Impact Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header-box">
            <h1 className="section-title">Moments of Hope</h1>
            <p className="section-lead">
              Real stories and real impact, captured on the field.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setSelectedImg(img.url)}
              >
                <img src={img.url} alt={img.caption} />
                <div className="gallery-overlay">
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💡 THE LIGHTBOX MODAL */}
        {selectedImg && (
          <div
            className="lightbox-backdrop"
            onClick={() => setSelectedImg(null)}
          >
            <div className="lightbox-content">
              <img src={selectedImg} alt="Enlarged impact" />
              <button className="close-lightbox">&times;</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
