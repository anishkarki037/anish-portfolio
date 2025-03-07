import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "./assets/anish-logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        navRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(linksRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.05,
        ease: "power3.in",
      });
      gsap.to(navRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        delay: 0.1,
      });
    }
  }, [isOpen]);

  const handleLinkClick = (event, id) => {
    event.preventDefault();
    setIsOpen(false);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaClick = () => {
    window.open("https://calendly.com/anishkarkee45/30min", "_blank");
  };

  return (
    <header>
      <ul ref={navRef} className={`nav-links ${isOpen ? "open" : ""}`}>
        {["Home", "About", "Tech", "Works", "Contact"].map((text, index) => (
          <li key={text} ref={(el) => (linksRef.current[index] = el)}>
            <a
              href={`#${text.toLowerCase()}`}
              onClick={(e) => handleLinkClick(e, `#${text.toLowerCase()}`)}
            >
              {text}
            </a>
          </li>
        ))}
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
              <button class="spiderverse-button" onClick={handleCtaClick}>
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
          <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
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
