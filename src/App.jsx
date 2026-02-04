import React, { useRef, useState, useEffect } from "react";
import { db } from "./firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  increment,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
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

  const [isProcessing, setIsProcessing] = useState(false);

  const [recentDonations, setRecentDonations] = useState([]);

  // Fetch recent donations whenever the form is submitted
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(
          collection(db, "donations"),
          orderBy("date", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => doc.data());
        setRecentDonations(docs);
      } catch (e) {
        console.log("Error fetching recent:", e);
      }
    };

    if (submitted) fetchRecent();
  }, [submitted]);

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
  const handleDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.target);
    const selectedCategory = formData.get("category");
    const donationAmount = Number(formData.get("amount"));

    const donationData = {
      donorName: formData.get("fullName"),
      donorEmail: formData.get("email"),
      amount: donationAmount,
      category: selectedCategory,
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "donations"), donationData);

      const causeToUpdate = causes.find((c) => c.title === selectedCategory);
      if (causeToUpdate) {
        const causeRef = doc(db, "causes", causeToUpdate.id);
        await updateDoc(causeRef, { raised: increment(donationAmount) });

        setCauses((prevCauses) =>
          prevCauses.map((c) =>
            c.id === causeToUpdate.id
              ? { ...c, raised: c.raised + donationAmount }
              : c
          )
        );
      }
      setSubmitted(true);
      setIsProcessing(false);
    } catch (error) {
      console.error("Donation failed:", error);
      setIsProcessing(false);
    } finally {
      // We don't setProcessing(false) here because if it's successful,
      // the whole form disappears anyway!
    }
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
            ) : (
              causes.map((cause) => (
                <CauseCard
                  key={cause.id}
                  title={cause.title}
                  raised={cause.raised}
                  goal={cause.goal}
                  icon={<Heart size={24} />}
                  image={cause.image}
                  description={cause.description}
                  benefits={cause.benefits || []}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. Donation Form Section - FULL RESTORE */}
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
                    <button type="button" className="amt-opt">
                      $25
                    </button>
                    <button type="button" className="amt-opt">
                      $50
                    </button>
                    <button type="button" className="amt-opt">
                      $100
                    </button>
                    <button type="button" className="amt-opt">
                      $250
                    </button>
                  </div>
                  <button type="button" className="custom-amt-btn">
                    Custom Amount
                  </button>

                  <label className="input-label">Enter Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-input-field"
                    placeholder="Minimum $10"
                    required
                  />

                  <label className="input-label">Donation Category</label>
                  <select name="category" className="form-input-field">
                    <option>All Causes</option>
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

                {/* The button is back! */}
                <button
                  className="btn-secondary"
                  onClick={() => setSubmitted(false)}
                  style={{
                    backgroundColor: "#2d5a3c", // Force a background color so it's not white
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    marginTop: "20px",
                    marginBottom: "30px",
                    cursor: "pointer",
                    display: "block",
                    zIndex: 10,
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
                          <span>{don.donorName}</span>
                          <span style={{ fontWeight: "bold" }}>
                            ${don.amount}
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

      {/* 7. Footer Section - FULL RESTORE */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col brand-col">
              <h3>
                <Heart size={24} fill="white" className="footer-heart" />
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
