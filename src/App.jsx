import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

import { Coins, Building2, Baby, Mail, Phone, MapPin } from "lucide-react";

function App() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSameHashClick = (path, sectionId) => (event) => {
    if (
      window.location.pathname === path &&
      window.location.hash === `#${sectionId}`
    ) {
      event.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    const fetchCauses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "causes"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCauses(data);
      } catch (error) {
        console.log("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCauses();
  }, []);

  const iconMap = {
    "Help the Poor": <Coins size={24} />,
    "Support the Homeless": <Building2 size={24} />,
    "Care for Orphans": <Baby size={24} />,
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                causes={causes}
                loading={loading}
                iconMap={iconMap}
                getCleanFirstName={getCleanFirstName}
              />
            }
          />

          <Route
            path="/info"
            element={<InfoPage causes={causes} iconMap={iconMap} />}
          />
        </Routes>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-col brand-col">
                <h3>
                  <img src="/favicon.png" alt="" className="footer-logo-img" />
                  <div className="logo">
                    HOPE<span>BRIDGE</span>
                    <sup>&trade;</sup>
                  </div>
                </h3>
                <p>
                  Transforming lives through compassion and generosity.
                  Together, we create lasting change.
                </p>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link
                      to="/info#about-us"
                      onClick={handleSameHashClick("/info", "about-us")}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#causes"
                      onClick={handleSameHashClick("/", "causes")}
                    >
                      Our Programs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#stats"
                      onClick={handleSameHashClick("/", "stats")}
                    >
                      Impact Reports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/info#contact-us"
                      onClick={handleSameHashClick("/info", "contact-us")}
                    >
                      Get Involved
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>
                  <Link
                    to="/info#contact-us"
                    onClick={handleSameHashClick("/info", "contact-us")}
                  >
                    Contact Us
                  </Link>
                </h4>

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
                © 2014 - {new Date().getFullYear()} DESIGNING SCRIPTS. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
