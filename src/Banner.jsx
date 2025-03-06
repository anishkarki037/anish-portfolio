import React from "react";
import bgimg from "./assets/bgimg.png";

const Banner = () => {
  return (
    <div className="banner container">
      <div className="banner-main">
        <div className="bg-img">
          <img src={bgimg} alt="Background Image" />
        </div>
        <div className="banner-texts">
          <h2>ANISH KARKI</h2>
          <h1>SOFTWARE DEVELOPER</h1>
          {/* <a
            href="https://www.linkedin.com/in/anish-karki-899b111b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Connect</button>
          
          </a> */}
          <p>CODING IS NOT JUST A PASSION BUT WAY OF LIVING.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
