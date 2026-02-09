import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Heart } from "lucide-react";

const InfoPage = ({ causes, iconMap }) => {
  const { hash } = useLocation();
  const [status, setStatus] = useState("");

  // Logic to jump to #about-us or #learn-more when coming from the home page
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // Future: Add Firebase 'messages' collection logic here
    setTimeout(() => setStatus("Message Sent! We will reach out soon."), 1500);
  };

  return (
    <div className="info-page">
      <header className="page-header">
        <nav className="navbar">
          <div className="container nav-content">
            <Link to="/" className="nav-logo">
              <Heart size={24} fill="white" className="logo-icon" />
              <div className="logo-text">
                HOPE<span>BRIDGE</span>
                <sup>&trade;</sup>
              </div>
            </Link>
            <div className="nav-links">
              <Link to="/info#about-us">About Us</Link>
              <Link to="/info#learn-more">Our Programs</Link>
              <Link to="/#">Impact Reports</Link>
              <Link to="/#">Get Involved</Link>
              <Link to="/#donation-form" className="nav-donate-btn">
                Donate Now
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* 1. About Us Section */}
      <section id="about-us" className="info-section cream-bg-section">
        <div className="container">
          <h1 className="section-title">The Story Behind the Bridge</h1>
          <div className="about-content-box">
            <p>
              Hopebridge wasn’t born in a boardroom; it was born on the ground.
              12 years ago, we started with a simple observation: the gap
              between a family's survival and their success isn't usually a lack
              of will, it’s a lack of access. Whether it's the 10 miles between
              an orphan and a school, or the invisible wall between a homeless
              veteran and a stable job, these are the gaps we bridge. Behind
              every box of aid we deliver is a team that stays. We don't just
              drop off supplies; we partner with community leaders to identify
              long-term solutions. <br />
              By 2026, we’ve learned that humanitarian aid is only as good as
              the transparency behind it. We handle the logistics, the advocacy,
              and the heavy lifting so that your generosity can focus on the
              only thing that matters: the human being on the other side of the
              bridge. <br />
              Join us in our mission to make a difference. Together, we can
              build a world where every child has the chance to grow, learn, and
              flourish💛.
            </p>
          </div>
        </div>
      </section>

      {/* Learn More (Deep Dive) Section */}
      <section id="learn-more" className="info-section light-bg-section">
        <div className="container">
          <h2 className="section-title">Our Deep Dive</h2>
          <div className="detailed-causes-list">
            {causes.map((cause) => (
              <div key={cause.id} className="detail-item">
                <div className="detail-header">
                  {iconMap[cause.title]}
                  <h3>{cause.title}</h3>
                </div>
                <p>{cause.fullDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
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
                        placeholder="Enter your full name"
                        required
                        className="form-input-field"
                      />
                    </div>
                    <div className="input-block">
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        required
                        className="form-input-field"
                      />
                    </div>
                  </div>

                  <label className="input-label">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="form-input-field"
                  />

                  <label className="input-label">Your Message</label>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    rows="4"
                    required
                    className="form-input-field"
                  ></textarea>

                  <button type="submit" className="complete-donation-btn">
                    {status ? (
                      status
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
    </div>
  );
};

export default InfoPage;
