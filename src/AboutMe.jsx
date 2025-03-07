import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import gif from "./assets/abtanim.webp";

const AboutMe = () => {
  const textHeadingRef = useRef(null);
  const textParagraphRef = useRef(null);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

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

          // Heading animation - slide in with a bounce and glow effect
          tl.fromTo(
            textHeadingRef.current,
            {
              opacity: 0,
              x: -100,
              scale: 1.5,
              textShadow: "0px 0px 0px rgba(255,255,255,0)",
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.2,
              ease: "elastic.out(1, 0.5)",
              textShadow:
                "0px 0px 20px rgba(255,255,255,0.5), 0px 0px 10px rgba(255,255,255,0.3)",
              onComplete: () => {
                // Remove text shadow after animation
                gsap.to(textHeadingRef.current, {
                  textShadow: "0px 0px 0px rgba(255,255,255,0)",
                  duration: 1.5,
                });
              },
            }
          )

            // Cleaner, more subtle paragraph animation
            .fromTo(
              textParagraphRef.current,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.5"
            );
        }
      },
      {
        threshold: 0.3, // Trigger when 70% of the section is visible
        rootMargin: "-10px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="about container" id="about" ref={sectionRef}>
      <div className="about-main">
        <div className="about-text">
          <h2
            ref={textHeadingRef}
            style={{
              opacity: 0,
              transformOrigin: "left center",
              position: "relative",
            }}
          >
            ABOUT ME
          </h2>
          <p
            ref={textParagraphRef}
            style={{
              opacity: 0,
              position: "relative",
            }}
          >
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
