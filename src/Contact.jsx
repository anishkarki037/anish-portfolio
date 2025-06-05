import React, { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const iconRefs = useRef([]);
  const orTextRef = useRef(null);
  const callLinkRef = useRef(null);
  const hasAnimated = useRef(false);

  // Clear refs array when needed
  iconRefs.current = [];

  // Add to refs array function
  const addToIconRefs = (el) => {
    if (el && !iconRefs.current.includes(el)) {
      iconRefs.current.push(el);
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

          // Title slide in from left with emphasis
          tl.fromTo(
            titleRef.current,
            {
              opacity: 0,
              x: -50,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
            }
          )

            // Staggered appearance of social icons
            .fromTo(
              iconRefs.current,
              {
                opacity: 0,
                y: 30,
                scale: 0.5,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(2)",
              },
              "-=0.3"
            )

            // "OR" text appearance
            .fromTo(
              orTextRef.current,
              {
                opacity: 0,
                scale: 0.7,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.1"
            )

            // Call link highlight effect
            .fromTo(
              callLinkRef.current,
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                  // Add a subtle attention animation to the call link
                  gsap.to(callLinkRef.current, {
                    y: -3,
                    duration: 0.8,
                    repeat: 1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: 0.3,
                  });
                },
              }
            );
        }
      },
      {
        threshold: 0.7, // Trigger when 70% of the section is visible
        rootMargin: "-10px",
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <div className="contact" id="contact" ref={contactRef}>
      <div className="contact-left">
        <h2 className="contact-title" ref={titleRef} style={{ opacity: 0 }}>
          WANT TO START A PROJECT?
        </h2>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/anish-karki-09b417203/"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToIconRefs}
            style={{ opacity: 0 }}
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/anishkarki037"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToIconRefs}
            style={{ opacity: 0 }}
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://wa.me/+9779864184038"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToIconRefs}
            style={{ opacity: 0 }}
          >
            <FaWhatsapp size={30} />
          </a>
          <a
            href="mailto:anishkarkee45@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={addToIconRefs}
            style={{ opacity: 0 }}
          >
            <FaEnvelope size={30} />
          </a>
          <p ref={orTextRef} style={{ opacity: 0 }}>
            OR
          </p>
          <a
            href="https://calendly.com/anishkarkee45/30min"
            ref={callLinkRef}
            style={{ opacity: 0 }}
          >
            Plan a call.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
