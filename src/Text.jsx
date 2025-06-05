import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const Text = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Set default animation duration
      once: false, // Ensure animations only run once
    });
  }, []);
  return (
    <div className="text container">
      <div className="text-main">
        <h2 data-aos="flip-up">WHAT I DO?</h2>
        <div className="text-highlight">
          <h1 data-aos="flip-up">DESIGN IT</h1>
        </div>
        <div className="text-highlight">
          <h1 data-aos="flip-up">CODE IT</h1>
        </div>
        <div className="text-highlight">
          <h1 data-aos="flip-up">SHIP IT</h1>
        </div>
      </div>
    </div>
  );
};

export default Text;
