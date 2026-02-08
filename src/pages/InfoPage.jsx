import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const InfoPage = ({ causes, iconMap }) => {
  const { hash } = useLocation();

  // Logic to jump to #about-us or #learn-more when coming from the home page
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="info-page">
      {/* About Us Section */}
      <section id="about-us" className="info-section alternate-bg">
        <div className="container">
          <h1 className="section-title">The Story Behind the Bridge</h1>
          <div className="about-content-box">
            <p>
              Hopebridge wasn’t born in a boardroom; it was born on the ground.
              We started with a simple observation: the gap between a family's
              survival and their success isn't usually a lack of will, it’s a
              lack of access. Whether it's the 10 miles between an orphan and a
              school, or the invisible wall between a homeless veteran and a
              stable job, these are the gaps we bridge. Behind every box of aid
              we deliver is a team that stays. We don't just drop off supplies;
              we partner with community leaders to identify long-term solutions.
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
      <section id="learn-more" className="info-section">
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
      <section id="contact-us" className="info-section alternate-bg">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;
