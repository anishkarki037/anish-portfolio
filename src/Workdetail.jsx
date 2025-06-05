import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const Workdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const API_URL = "https://anishkarki37.com.np/works.php";
  const API_BASE_URL = "https://anishkarki37.com.np/";

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}?action=single&id=${id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setWork(data.data);
        } else {
          setError(data.message || "Failed to load work");
        }
      } catch (err) {
        setError("Error fetching work: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);

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

  if (error || !work) {
    return (
      <div className="work-detail-error">
        <div className="error-container">
          <div className="glitch-text" data-text={error || "Work not found"}>
            {error || "Work not found"}
          </div>
          <motion.button
            className="cyber-button"
            onClick={() => navigate("/works")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Works</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="work-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.section
        className="work-hero"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="hero-content">
          <div className="hero-info">
            <motion.div
              className="work-category-badge"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {work.category}
            </motion.div>

            <motion.h1
              className="work-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {work.title}
            </motion.h1>

            <motion.p
              className="work-description"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {work.description}
            </motion.p>

            {work.technologies && work.technologies.length > 0 && (
              <motion.div
                className="tech-stack"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="tech-label">Tech Stack:</span>
                <div className="tech-tags">
                  {work.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              className="action-buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {work.live_url && (
                <motion.a
                  href={work.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Live</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.a>
              )}
              {work.github_url && (
                <motion.a
                  href={work.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>GitHub</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 19C4 20.5 4 16.5 2 16M22 16V22L18 20L14 22V16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div
            className="hero-image"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="image-frame">
              <img
                src={`${API_BASE_URL}${work.thumbnail_image}`}
                alt={work.title}
              />
              <div className="image-glow"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      {work.showcase_images && work.showcase_images.length > 0 && (
        <motion.section
          className="work-gallery"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="gallery-header">
            <h2>Project Showcase</h2>
            <div className="gallery-nav">
              <button
                className={`nav-dot ${selectedImage === -1 ? "active" : ""}`}
                onClick={() => setSelectedImage(-1)}
              />
              {work.showcase_images.map((_, idx) => (
                <button
                  key={idx}
                  className={`nav-dot ${selectedImage === idx ? "active" : ""}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          </div>

          <div className="gallery-container">
            <div className="main-showcase">
              <motion.div
                className="showcase-image"
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={
                    selectedImage === -1
                      ? `${API_BASE_URL}${work.thumbnail_image}`
                      : `${API_BASE_URL}${work.showcase_images[selectedImage]}`
                  }
                  alt={`Showcase ${selectedImage + 1}`}
                />
                <div className="image-overlay">
                  <div className="scan-line"></div>
                </div>
              </motion.div>
            </div>

            <div className="gallery-thumbnails">
              <div
                className={`thumbnail ${selectedImage === -1 ? "active" : ""}`}
                onClick={() => setSelectedImage(-1)}
              >
                <img
                  src={`${API_BASE_URL}${work.thumbnail_image}`}
                  alt="Main"
                />
              </div>
              {work.showcase_images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${
                    selectedImage === idx ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={`${API_BASE_URL}${img}`}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default Workdetail;
