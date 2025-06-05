import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import bgimg from "./assets/bgimg.png";

const Banner = () => {
  const bannerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      bannerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    textRefs.current.forEach((text, index) => {
      gsap.fromTo(
        text,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          delay: index * 0.3,
        }
      );
    });
  }, []);

  return (
    <div className="banner container" id="home" ref={bannerRef}>
      <div className="banner-main">
        <div className="bg-img">
          <img src={bgimg} alt="Background Image" />
        </div>
        <div className="banner-texts">
          <h2 ref={(el) => (textRefs.current[0] = el)}>ANISH KARKI</h2>
          <h1 ref={(el) => (textRefs.current[1] = el)}>SOFTWARE DEVELOPER</h1>
          <p ref={(el) => (textRefs.current[2] = el)}>
            CEO & CO-FOUNDER OF BLUEBUG SOFTWARE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
