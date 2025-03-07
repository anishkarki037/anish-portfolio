import React from "react";

// Import individual images for each project
import yuma from "./assets/yuma.webp";
import visit from "./assets/visit.webp";
import Bijuwar from "./assets/bg2.jpg";
import projectThreeImg from "./assets/bg3.jpg";
import nest from "./assets/bg4.jpg";
import blackdiamond from "./assets/bg5.jpg";

const dummyWorks = [
  {
    title: "YUMA Clothing",
    tag: "E-COMMERCE WEBSITE",
    image: yuma,
    link: "https:/demo3.bluebugsoft.com",
  },
  {
    title: "Visit Abroad",
    tag: "TRAVEL",
    image: visit,
    link: "https:/demo2.bluebugsoft.com",
  },
  { title: "Bijuwar Skatepark", tag: "TICKETING SOFTWARE", image: Bijuwar },

  { title: "NEST CMS", tag: "CMS", image: nest },
  {
    title: "Connectifi Solutions",
    tag: "AGENCY WEBSITE",
    image: projectThreeImg,
    link: "https://connectifisolutions.com",
  },
  {
    title: "Black Diamond Salon",
    tag: "SALON WEBSITE",
    image: blackdiamond,
    link: "https://blackdiamondsalon.com",
  },
];

const Works = () => {
  return (
    <div className="works" id="works">
      <h2 className="works-title">WORKS</h2>
      {dummyWorks.map((work, index) => (
        <div
          key={index}
          className="work-section"
          style={{ backgroundImage: `url(${work.image})` }} // Each section uses its own image
        >
          <div className="work-content">
            <h3>{work.title}</h3>
            <p>{work.tag}</p>
            {work.link && (
              <a href={work.link} target="_blank" rel="noopener noreferrer">
                See Live
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Works;
