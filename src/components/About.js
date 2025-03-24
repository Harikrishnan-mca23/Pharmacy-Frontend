import React from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Our Pharmacy Management System</h1>
        <p className="about-text">
          Our Pharmacy Management System is designed to streamline pharmacy operations,
          improve inventory management, and ensure smooth prescription handling.
        </p>
        <h2 className="about-subtitle">Key Features:</h2>
        <ul className="about-list">
          <li>Efficient inventory management</li>
          <li>Automated prescription handling</li>
          <li>Secure customer and supplier records</li>
          <li>Real-time sales tracking</li>
          <li>Intuitive user-friendly interface</li>
        </ul>
        <h2 className="about-subtitle">Why Choose Us?</h2>
        <p className="about-text">
          Our system ensures pharmacies run smoothly with minimal errors, reducing operational
          costs and improving customer satisfaction. With robust security measures and cloud
          integration, managing your pharmacy has never been easier.
        </p>
      </div>
    </div>
  );
};

export default About;
