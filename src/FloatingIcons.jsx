import React from "react";
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaFileDownload,
} from "react-icons/fa";
import "./FloatingIcons.css";

const FloatingIcons = () => {
  return (
    <div className="floating-icons">
      <a
        href="https://wa.me/+9779864184038"
        target="_blank"
        rel="noopener noreferrer"
        title="Whatsapp"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://github.com/anishkarki037"
        target="_blank"
        rel="noopener noreferrer"
        title="Github"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/anish-karki-09b417203/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <FaLinkedin />
      </a>
      <a title="Download CV" href="/Anish-Karki-Resume.pdf" download>
        <FaFileDownload />
      </a>
    </div>
  );
};

export default FloatingIcons;
