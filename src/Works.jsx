import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import individual images for each project (fallback images)
import yuma from "./assets/yuma.webp";
import visit from "./assets/visit.webp";
import Bijuwar from "./assets/bg2.jpg";
import projectThreeImg from "./assets/bg3.jpg";
import nest from "./assets/bg4.jpg";
import blackdiamond from "./assets/bg5.jpg";

const fallbackImages = [
  yuma,
  visit,
  Bijuwar,
  projectThreeImg,
  nest,
  blackdiamond,
];

const Works = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedWorks();
  }, []);

  const API_BASE_URL = "https://anishkarki37.com.np/";

  const fetchFeaturedWorks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}works.php?action=featured&limit=4`
      );
      const data = await response.json();

      if (data.success) {
        setWorks(data.data || []);
      } else {
        setError(data.message || "Failed to fetch works");
      }
    } catch (error) {
      console.error("Error fetching featured works:", error);
      setError("Failed to load featured works");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMoreClick = () => {
    navigate("/works");
  };

  if (loading) {
    return (
      <div className="works" id="works">
        <h2 className="works-title">WORKS</h2>
        <div className="loading-message">Loading featured works...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="works" id="works">
        <h2 className="works-title">WORKS</h2>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  // If no works found, show a message
  if (works.length === 0) {
    return (
      <div className="works" id="works">
        <h2 className="works-title">WORKS</h2>
        <div className="no-works-message">No featured works available</div>
      </div>
    );
  }

  return (
    <div className="works" id="works">
      <h2 className="works-title">WORKS</h2>
      {works.map((work, index) => (
        <div
          key={work.id}
          className="work-section"
          style={{
            backgroundImage: `url(${
              work.thumbnail_image
                ? API_BASE_URL + work.thumbnail_image
                : fallbackImages[index % fallbackImages.length]
            })`,
          }}
        >
          <div className="work-content">
            <h3>{work.title}</h3>
            <p>{work.category}</p>
            <div className="work-buttons">
              {work.live_url && work.live_url.trim() !== "" && (
                <a
                  href={work.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Live
                </a>
              )}
              {work.github_url && work.github_url.trim() !== "" && (
                <a
                  href={work.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="sticky-button-container">
        <button className="see-more-works" onClick={handleSeeMoreClick}>
          More Projects
        </button>
      </div>
    </div>
  );
};

export default Works;
