import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  Quote,
  CheckCircle,
} from "lucide-react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import "./InfoPage.css";

const InfoPage = ({ causes, iconMap }) => {
  const { hash } = useLocation();
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleSameHashClick = (sectionId) => (event) => {
    if (hash === `#${sectionId}`) {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  useEffect(() => {
    if (hash) {
      scrollToSection(hash.replace("#", ""));
    }
  }, [hash]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.target);
    const messageData = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      setShowSuccess(true);
      e.target.reset();
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="info-page">
      <header className="page-header">
        <nav className="navbar">
          <div className="container nav-content">
            <Link to="/" className="nav-logo">
              <img
                src="/favicon.png" // or the path to your logo file
                alt="Hopebridge Logo"
                className="custom-logo-img"
              />
              <div className="logo-text">
                HOPE<span>BRIDGE</span>
                <sup>&trade;</sup>
              </div>
            </Link>
            <div className="nav-links">
              <Link
                to="/info#contact-us"
                onClick={handleSameHashClick("contact-us")}
              >
                Contact Us
              </Link>
              <Link to="/#causes">Our Programs</Link>
              <Link to="/#donation-form" className="nav-donate-btn">
                Donate Now
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* 1. About Us Section */}
      <section
        id="about-us"
        className="info-section cream-bg-section centered-about"
      >
        <div className="container">
          <div className="about-vignette">
            <Quote size={40} className="quote-icon" />
            <h1 className="section-title">The Story Behind the Bridge</h1>
            <div className="about-content-box">
              <p>
                Hopebridge wasn’t born in a boardroom; it was born on the
                ground. In 2014, we started with a simple observation: the gap
                between a family's survival and their success isn't usually a
                lack of will, it’s a lack of access.
              </p>
              <p className="emphasis-text">
                Whether it's the 10 miles between an orphan and a school, or the
                invisible wall between a homeless veteran and a stable job,
                these are the gaps we bridge. Behind every box of aid we deliver
                is a team that stays. We don't just drop off supplies; we
                partner with community leaders to identify long-term solutions.{" "}
              </p>
              <p>
                By 2026, we’ve learned that humanitarian aid is only as good as
                the transparency behind it. We handle the logistics, the
                advocacy, and the heavy lifting so that your generosity can
                focus on the only thing that matters:{" "}
                <strong>
                  the human being on the other side of the bridge.
                </strong>{" "}
                Join us in our mission to make a difference.
              </p>
              <div className="signature">Together, we flourish 💛</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Contact Section */}
      <section id="contact-us" className="info-section light-bg-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-lead">
            Have questions about our programs or transparency? Reach out below.
          </p>

          <div className="contact-grid">
            {/* Left: Contact Info */}
            <div className="contact-info-col">
              <div className="contact-card">
                <div className="info-row">
                  <Mail className="contact-icon" />
                  <div>
                    <h4>Email Us</h4>
                    <p>contact@hopebridge.org</p>
                  </div>
                </div>
                <div className="info-row">
                  <Phone className="contact-icon" />
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="info-row">
                  <MapPin className="contact-icon" />
                  <div>
                    <h4>Visit Us</h4>
                    <p>123 Bridge Street, Hope City</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Form Card */}
            <div className="contact-form-col">
              <div className="contact-card">
                <h3 className="form-header-title">Send us a Message</h3>
                <p className="form-subtitle">
                  We usually respond within 24 hours.
                </p>

                <form
                  className="pro-contact-form"
                  onSubmit={handleContactSubmit}
                >
                  <div className="form-group-row">
                    <div className="input-block">
                      <label className="input-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        required
                        className="form-input-field"
                      />
                    </div>
                    <div className="input-block">
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="yourname@example.com"
                        required
                        className="form-input-field"
                      />
                    </div>
                  </div>

                  <label className="input-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    required
                    className="form-input-field"
                  />

                  <label className="input-label">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows="4"
                    required
                    className="form-input-field"
                  ></textarea>

                  <button
                    type="submit"
                    className="complete-donation-btn"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <div className="btn-spinner"></div>
                    ) : (
                      <>
                        <Send size={18} style={{ marginRight: "10px" }} /> Send
                        Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="modal-backdrop" onClick={() => setShowSuccess(false)}>
          <div
            className="success-popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle size={60} color="#2d5a3c" />
            <h2>Message Sent!</h2>
            <p>
              Thank you for reaching out to Hopebridge. One of our team members
              will get back to you shortly via email.
            </p>
            <button
              className="btn-primary"
              onClick={() => setShowSuccess(false)}
            >
              Great, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
