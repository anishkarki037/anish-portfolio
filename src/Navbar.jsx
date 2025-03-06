import React, { useState } from "react";
import logo from "./assets/anish-logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <nav>
        <div className="logo">
          <a href="#home">
            <img src={logo} alt="Anish Karki logo" />
          </a>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div className="cta">
            <div class="button-wrapper">
              <button class="spiderverse-button">
                Let's Talk
                <div class="glitch-layers">
                  <div class="glitch-layer layer-1"> Let's Talk</div>
                  <div class="glitch-layer layer-2"> Let's Talk</div>
                </div>
                <div class="noise"></div>
                <div class="glitch-slice"></div>
              </button>
            </div>
          </div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
