import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// API configuration - Update this to your actual API URL
const API_BASE_URL = "https://anishkarki37.com.np/blogs.php";

// API service functions
const blogAPI = {
  async getBlogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}?action=list&${queryString}`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return response.json();
  },

  async searchBlogs(query) {
    const response = await fetch(
      `${API_BASE_URL}?action=search&q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search blogs");
    return response.json();
  },

  async getBlog(id) {
    const response = await fetch(`${API_BASE_URL}?action=single&id=${id}`);
    if (!response.ok) throw new Error("Failed to fetch blog");
    return response.json();
  },
};

const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("published");
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 12,
    offset: 0,
    has_more: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  // Extract unique categories from blogs
  const getCategories = () => {
    const categorySet = new Set(["All"]);
    blogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag) => categorySet.add(tag));
      }
    });
    return Array.from(categorySet);
  };

  // Fetch blogs from backend
  const fetchBlogs = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const defaultParams = {
        status: selectedStatus,
        limit: pagination.limit,
        offset: params.offset || 0,
      };

      const response = await blogAPI.getBlogs({ ...defaultParams, ...params });

      if (response.success) {
        const blogsData = response.data.blogs.map((blog) => ({
          ...blog,
          category:
            blog.tags && blog.tags.length > 0 ? blog.tags[0] : "General",
          date: new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime: calculateReadTime(blog.content || ""),
          image: blog.image || "/api/placeholder/400/250",
        }));

        if (params.offset > 0) {
          setBlogs((prev) => [...prev, ...blogsData]);
        } else {
          setBlogs(blogsData);
        }
        setPagination(response.data.pagination);
      } else {
        setError(response.message || "Failed to load blogs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search blogs
  const searchBlogs = async (query) => {
    if (!query.trim()) {
      fetchBlogs();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await blogAPI.searchBlogs(query);

      if (response.success) {
        const blogsData = response.data.map((blog) => ({
          ...blog,
          category:
            blog.tags && blog.tags.length > 0 ? blog.tags[0] : "General",
          date: new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readTime: calculateReadTime(blog.content || ""),
          image: blog.image || "/api/placeholder/400/250",
        }));

        setBlogs(blogsData);
        setPagination((prev) => ({ ...prev, has_more: false }));
      } else {
        setError(response.message || "Search failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Filter blogs by category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory ||
      (blog.tags && blog.tags.includes(selectedCategory));
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle search with debouncing
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery) {
        searchBlogs(searchQuery);
      } else {
        fetchBlogs();
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Initial load and status filter changes
  useEffect(() => {
    fetchBlogs();
  }, [selectedStatus]);

  // Handle blog click
  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  // Load more blogs
  const loadMore = () => {
    if (pagination.has_more && !loading) {
      fetchBlogs({ offset: pagination.offset + pagination.limit });
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Error Loading Blogs</h2>
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchBlogs();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Tech Blog
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Exploring the frontiers of technology
        </motion.p>
      </div>

      <div className="blogs-filters">
        <motion.div
          className="search-bar"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <motion.div
          className="categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {getCategories().map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Status Filter
        <motion.div 
          className="status-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label>Status: </label>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="all">All</option>
          </select>
        </motion.div> */}
      </div>

      {loading && blogs.length === 0 ? (
        <div className="work-detail-loading">
          <div className="cyber-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <span className="loader-text">Loading work...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => handleBlogClick(blog.id)}
              >
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <div className="blog-category">{blog.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                    {blog.views > 0 && <span>{blog.views} views</span>}
                  </div>
                  <h2>{blog.title}</h2>
                  <p>{blog.excerpt}</p>
                  <div className="blog-tags">
                    {blog.tags &&
                      blog.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                  </div>
                  {/* <div className="blog-status">
                    <span className={`status-badge ${blog.status}`}>
                      {blog.status}
                    </span>
                  </div> */}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          {pagination.has_more && (
            <div className="load-more-container">
              <button
                onClick={loadMore}
                disabled={loading}
                className="load-more-btn"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {/* Results Info */}
          <div className="results-info">
            <p>
              Showing {filteredBlogs.length} of {pagination.total} articles
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsPage;
