import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InfoPage from "./pages/InfoPage";
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
  const [selectedCause, setSelectedCause] = useState(null);
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

  useEffect(() => {
    if (selectedCause) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCause]);

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
    <Router>
      <div className="app-container">
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                {/* 💎 THE CAUSE MODAL (Pop-out) */}
                {selectedCause && (
                  <div
                    className="modal-backdrop"
                    onClick={() => setSelectedCause(null)}
                  >
                    <div
                      className="cause-modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="close-modal"
                        onClick={() => setSelectedCause(null)}
                      >
                        &times;
                      </button>

                      <div className="modal-grid">
                        <div className="modal-image-side">
                          <img
                            src={selectedCause.image}
                            alt={selectedCause.title}
                          />
                        </div>

                        <div className="modal-info-side">
                          {/* 🎯 TOP: Small & Tight Header */}
                          <div className="modal-header">
                            <div className="modal-icon-circle-mini">
                              {iconMap[selectedCause.title] || (
                                <Heart size={20} />
                              )}
                            </div>
                            <h3 className="modal-title-small">
                              {selectedCause.title}
                            </h3>
                          </div>

                          {/* 🎯 MIDDLE: Large Scrolling Area for Story */}
                          <div className="modal-scroll-area">
                            <p className="full-desc-text">
                              {selectedCause.fullDescription}
                            </p>
                          </div>

                          {/* 🎯 BOTTOM: Small & Pinned Footer */}
                          <div className="modal-footer-mini">
                            <div className="modal-stats-mini">
                              <div className="progress-stats">
                                <span>
                                  Raised: $
                                  {Number(
                                    selectedCause.raised
                                  ).toLocaleString()}
                                </span>
                                <span>
                                  {Math.round(
                                    (selectedCause.raised /
                                      selectedCause.goal) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="progress-bar-bg">
                                <div
                                  className="progress-bar-fill"
                                  style={{
                                    width: `${
                                      (selectedCause.raised /
                                        selectedCause.goal) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <button
                              className="donate-btn-small"
                              onClick={() => {
                                setSelectedCause(null);
                                scrollToDonation();
                              }}
                            >
                              Donate to this cause
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          />

          {/* 🎯 The New Information Hub Page */}
          {/* <Route
            path="/info"
            element={<InfoPage iconMap={iconMap} causes={causes} />}
          /> */}
        </Routes>

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
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      About Us
                    </Link>
                  </li>
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
                © 2014 - 2026 HOPE<span>BRIDGE </span>
                FOUNDATION. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
