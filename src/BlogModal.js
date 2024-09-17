import React from 'react';
import './BlogModal.css';

function BlogModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="blog-modal-overlay">
      <div className="blog-modal-content">
        <h2>{blog.title}</h2>
        <div className="blog-content">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="button-container">
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;