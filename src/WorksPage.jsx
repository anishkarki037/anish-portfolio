import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuScreenShare, LuGithub } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const WorksPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://anishkarki37.com.np/";
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://anishkarki37.com.np/works.php?action=list"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setWorks(data.data.works || []);
      } else {
        throw new Error(data.message || "Failed to fetch works");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching works:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="work-detail-loading">
        <div className="cyber-loader">
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <span className="loader-text">Loading work...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="works-page">
        <div className="works-page-header">
          <h1>My Works</h1>
          <p>A collection of my recent projects and collaborations</p>
        </div>
        <div>Error loading works: {error}</div>
      </div>
    );
  }

  return (
    <div className="works-page">
      <div className="works-page-header">
        <h1>My Works</h1>
        <p>A collection of my recent projects and collaborations</p>
      </div>

      <div className="works-grid">
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            className="work-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/works/${work.id}`)}
            transition={{ delay: index * 0.1 }}
            style={{ cursor: "pointer" }}
          >
            <div
              className="work-card-image"
              style={{
                backgroundImage: `url(${API_URL}${work.thumbnail_image})`,
              }}
            >
              <div className="work-card-overlay"></div>
            </div>

            <div className="work-card-content">
              <h3>{work.title}</h3>
              <p>{work.category}</p>

              <div className="work-card-footer">
                {work.technologies && work.technologies.length > 0 && (
                  <div className="technologies-container">
                    {work.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className="action-buttons"
                  onClick={(e) => e.stopPropagation()}
                >
                  {work.live_url && work.live_url.trim() && (
                    <a
                      href={work.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn live-btn"
                      title="View Live"
                    >
                      <LuScreenShare />
                    </a>
                  )}
                  {work.github_url && work.github_url.trim() && (
                    <a
                      href={work.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn github-btn"
                      title="View Code"
                    >
                      <LuGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorksPage;
