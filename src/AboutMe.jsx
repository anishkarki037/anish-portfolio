import React from "react";
import gif from "./assets/abtanim.webp";

const AboutMe = () => {
  return (
    <div className="about container">
      <div className="about-main">
        <div className="about-text">
          <h2>ABOUT ME</h2>
          <p>
            I am a software developer with a passion for creating user-friendly
            applications. I have experience in developing web applications using
            React, Node.js, and Express. I am always eager to learn new
            technologies and improve my skills. I am currently looking for
            opportunities to work on challenging projects and grow as a
            developer.
          </p>
        </div>
        <div className="about-gif">
          <img src={gif} alt="Anish Karki" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
