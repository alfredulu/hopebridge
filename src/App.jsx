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
  Coins,
  Building2,
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
import confetti from "canvas-confetti";

function App() {
  const [formError, setFormError] = useState("");

  const amountInputRef = useRef(null);

  const donationRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);

  const [recentDonations, setRecentDonations] = useState([]);

  const [amountValue, setAmountValue] = useState("");

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null); // For Lightbox

  const getCleanFirstName = (fullName) => {
    if (!fullName) return "Hero";

    const parts = fullName.split(/[^a-zA-Z]/).filter((part) => part.length > 0);

    const realName = parts.find((part) => part.length > 1);

    if (realName) {
      return realName.charAt(0).toUpperCase() + realName.slice(1).toLowerCase();
    }

    return parts[0] || "Hero";
  };

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

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const images = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGalleryImages(images);
      } catch (e) {
        console.error("Gallery fetch failed:", e);
      }
    };
    fetchGallery();
  }, []);

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.target);
    const donationAmount = Number(formData.get("amount"));
    const selectedCategory = formData.get("category");

    if (donationAmount < 10) {
      setFormError("Minimum donation is $10. Please enter a valid amount.");
      return;
    }

    if (selectedCategory === "All Causes") {
      setFormError("Please select a specific cause to support.");
      return;
    }

    setIsProcessing(true);

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
              ? { ...c, raised: Number(c.raised) + donationAmount }
              : c
          )
        );
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2d5a3c", "#c76d5a", "#fff2d9"],
        });

        setSubmitted(true);
      } else {
        console.error("Cause match failed for:", selectedCategory);
      }

      setIsProcessing(false);
    } catch (error) {
      console.error("Donation failed:", error);
      setFormError("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const iconMap = {
    "Help the Poor": <Coins size={24} />,
    "Support the Homeless": <Building2 size={24} />,
    "Care for Orphans": <Baby size={24} />,
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
                  icon={iconMap[cause.title] || <Heart size={24} />}
                  image={cause.image}
                  description={cause.description}
                  benefits={cause.benefits || []}
                  onDonateClick={scrollToDonation}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      {/* 5. How It Works Section */}
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
            {/* One straight line behind icons */}
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

          {/* 💎 100% Transparency Box - Now part of this section */}
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
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className="amt-opt"
                        onClick={() => {
                          setAmountValue(amt);
                          setFormError(""); // Clear errors when a valid button is clicked
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
                    value={amountValue} // Controlled input
                    onChange={(e) => setAmountValue(e.target.value)} // Allow typing too
                    onFocus={() => setFormError("")}
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

                  {formError && (
                    <div className="form-warning">
                      <span className="warning-icon">⚠️</span> {formError}
                    </div>
                  )}

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

      {/* 8. Footer Section */}
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
