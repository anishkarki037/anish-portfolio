import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [renderedContent, setRenderedContent] = useState("");

  useEffect(() => {
    // Always scroll to top when this component mounts
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Function to escape HTML entities
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  // Function to convert Draft.js content to HTML
  const convertDraftToHtml = (draftContent) => {
    try {
      let contentData;

      // Handle different possible formats of Draft.js content
      if (typeof draftContent === "string") {
        try {
          contentData = JSON.parse(draftContent);
        } catch {
          // If it's not valid JSON, treat as plain text
          return draftContent;
        }
      } else if (draftContent && typeof draftContent === "object") {
        contentData = draftContent;
      } else {
        return draftContent || "";
      }

      // Check if it's Draft.js format
      if (!contentData.blocks || !Array.isArray(contentData.blocks)) {
        // Not Draft.js format, return as is
        return typeof draftContent === "string" ? draftContent : "";
      }

      // Convert Draft.js blocks to HTML
      let html = "";

      contentData.blocks.forEach((block) => {
        const text = block.text || "";
        const type = block.type || "unstyled";

        // Apply inline styles - but skip for code-block type
        let styledText = text;
        if (
          block.inlineStyleRanges &&
          block.inlineStyleRanges.length > 0 &&
          type !== "code-block"
        ) {
          // Sort ranges by offset (descending) to avoid offset issues when inserting tags
          const sortedRanges = [...block.inlineStyleRanges].sort(
            (a, b) => b.offset - a.offset
          );

          sortedRanges.forEach((range) => {
            const { offset, length, style } = range;
            const beforeText = styledText.substring(0, offset);
            const targetText = styledText.substring(offset, offset + length);
            const afterText = styledText.substring(offset + length);

            let wrappedText = targetText;
            switch (style) {
              case "BOLD":
                wrappedText = `<strong>${targetText}</strong>`;
                break;
              case "ITALIC":
                wrappedText = `<em>${targetText}</em>`;
                break;
              case "UNDERLINE":
                wrappedText = `<u>${targetText}</u>`;
                break;
              case "CODE":
                wrappedText = `<code>${escapeHtml(targetText)}</code>`;
                break;
              default:
                wrappedText = targetText;
            }

            styledText = beforeText + wrappedText + afterText;
          });
        }

        // Apply entity styles (links, etc.) - but skip for code-block type
        if (
          block.entityRanges &&
          block.entityRanges.length > 0 &&
          contentData.entityMap &&
          type !== "code-block"
        ) {
          const sortedEntityRanges = [...block.entityRanges].sort(
            (a, b) => b.offset - a.offset
          );

          sortedEntityRanges.forEach((entityRange) => {
            const { offset, length, key } = entityRange;
            const entity = contentData.entityMap[key];

            if (entity && entity.type === "LINK") {
              const beforeText = styledText.substring(0, offset);
              const linkText = styledText.substring(offset, offset + length);
              const afterText = styledText.substring(offset + length);
              const url = entity.data?.url || "#";

              styledText =
                beforeText +
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>` +
                afterText;
            }
          });
        }

        // Wrap in appropriate HTML tags based on block type
        switch (type) {
          case "header-one":
            html += `<h1>${styledText}</h1>`;
            break;
          case "header-two":
            html += `<h2>${styledText}</h2>`;
            break;
          case "header-three":
            html += `<h3>${styledText}</h3>`;
            break;
          case "header-four":
            html += `<h4>${styledText}</h4>`;
            break;
          case "header-five":
            html += `<h5>${styledText}</h5>`;
            break;
          case "header-six":
            html += `<h6>${styledText}</h6>`;
            break;
          case "blockquote":
            html += `<blockquote>${styledText}</blockquote>`;
            break;
          case "unordered-list-item":
            html += `<ul><li>${styledText}</li></ul>`;
            break;
          case "ordered-list-item":
            html += `<ol><li>${styledText}</li></ol>`;
            break;
          case "code-block":
            // Escape HTML in code blocks to prevent rendering
            html += `<div class="pre-wrapper"><pre><code>${escapeHtml(
              text
            )}</code></pre></div>`;
            break;
          case "atomic":
            // Handle atomic blocks (images, embeds, etc.)
            if (
              block.entityRanges &&
              block.entityRanges.length > 0 &&
              contentData.entityMap
            ) {
              const entityKey = block.entityRanges[0].key;
              const entity = contentData.entityMap[entityKey];
              if (entity && entity.type === "IMAGE") {
                const src = entity.data?.src || "";
                const alt = entity.data?.alt || "";
                html += `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`;
              }
            }
            break;
          case "unstyled":
          default:
            if (styledText.trim()) {
              html += `<p>${styledText}</p>`;
            } else {
              html += "<br>";
            }
            break;
        }
      });

      // Clean up consecutive list items
      html = html.replace(/<\/ul><ul>/g, "").replace(/<\/ol><ol>/g, "");

      return html;
    } catch (error) {
      console.error("Error converting Draft.js content:", error);
      // Fallback to raw content if conversion fails
      return typeof draftContent === "string" ? draftContent : "";
    }
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://anishkarki37.com.np/blogs.php?action=single&id=${id}`
        );
        const data = await response.json();

        if (data.success) {
          setPost(data.data);

          // Process the content based on Draft.js
          if (data.data.content) {
            const html = convertDraftToHtml(data.data.content);
            setRenderedContent(html);
          }
        } else {
          setError(data.message || "Failed to fetch blog post");
        }
      } catch (err) {
        setError("Error fetching blog post: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <h1>{error || "Blog post not found"}</h1>
          <button onClick={() => navigate("/blogs")} className="back-button">
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="blog-post-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blog-post-header">
        <div className="container">
          <motion.button
            className="back-button"
            onClick={() => navigate("/blogs")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ← Back to Blogs
          </motion.button>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>
          <motion.div
            className="blog-meta"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>
              {new Date(post.date || post.created_at).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>{post.views} views</span>
            <span>•</span>
            <span>{post.status}</span>
          </motion.div>
        </div>
      </div>

      <div className="blog-post-content">
        <div className="container">
          {post.image && (
            <motion.div
              className="featured-image"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img src={post.image} alt={post.title} />
            </motion.div>
          )}

          <motion.div
            className="content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {post.excerpt && (
              <div className="excerpt">
                <p>{post.excerpt}</p>
              </div>
            )}

            {/* Render converted Draft.js content */}
            <div className="blog-content">
              {post.content && post.content.blocks ? (
                post.content.blocks.map((block, index) => {
                  if (block.type === "code-block") {
                    return (
                      <div key={index} className="pre-wrapper">
                        <pre>
                          <code>{block.text}</code>
                        </pre>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: convertDraftToHtml({
                            blocks: [block],
                            entityMap: post.content.entityMap,
                          }),
                        }}
                      />
                    );
                  }
                })
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderedContent || post.content,
                  }}
                />
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
