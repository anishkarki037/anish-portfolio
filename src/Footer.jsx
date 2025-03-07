import React, { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);
  const headingRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef([]);
  const hasAnimated = useRef(false);

  // Clear refs array when needed
  linksRef.current = [];

  // Add to refs array function
  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    // Set up intersection observer to detect when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // Only trigger animation when fully visible and hasn't animated yet
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Create timeline for animations
          const tl = gsap.timeline();

          // Heading animation with emphasis
          tl.fromTo(
            headingRef.current,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
            }
          )

            // Bottom left content animation
            .fromTo(
              leftContentRef.current,
              {
                opacity: 0,
                x: -50,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.4"
            )

            // Bottom right title animation
            .fromTo(
              titleRef.current,
              {
                opacity: 0,
                x: 50,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.6"
            )

            // Staggered appearance of social links
            .fromTo(
              linksRef.current,
              {
                opacity: 0,
                y: 30,
                scale: 0.8,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.7)",
                onComplete: () => {
                  // Add hover effects after animation completes
                  linksRef.current.forEach((link) => {
                    link.addEventListener("mouseenter", () => {
                      gsap.to(link, {
                        scale: 1.05,
                        color: "#61dafb",
                        duration: 0.3,
                        ease: "power1.out",
                      });
                    });

                    link.addEventListener("mouseleave", () => {
                      gsap.to(link, {
                        scale: 1,
                        color: "inherit",
                        duration: 0.3,
                        ease: "power1.out",
                      });
                    });
                  });
                },
              },
              "-=0.3"
            );
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the footer is visible
        rootMargin: "-10px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Cleanup
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }

      linksRef.current.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="top">
        <h1 ref={headingRef} style={{ opacity: 0 }}>
          {" "}
          LET'S WORK.
        </h1>
      </div>

      <div className="bottom">
        <div
          ref={leftContentRef}
          className="bottom-left"
          style={{ opacity: 0 }}
        >
          <p> If you have any projects to discuss feel free to get in touch!</p>
          &copy;2025 all rights reserved, Anish Karki.
        </div>

        <div className="bottom-right">
          <h5 ref={titleRef} style={{ opacity: 0 }}>
            Connect
          </h5>
          <a
            href="https://www.linkedin.com/in/anish-karki-09b417203/"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToLinksRef}
            style={{ opacity: 0 }}
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/anishkarki037"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToLinksRef}
            style={{ opacity: 0 }}
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://wa.me/+9779864184038"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToLinksRef}
            style={{ opacity: 0 }}
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="mailto:anishkarkee45@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToLinksRef}
            style={{ opacity: 0 }}
          >
            <FaEnvelope /> anishkarkee45@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
