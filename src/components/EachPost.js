import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Post = ({ region, title, description, image, tags, handlePostClick}) => {

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent triggering the post navigation
    // Additional button-specific logic can go here
  };
  
  return (
    <article className={`post-item ${region}`} onClick={handlePostClick}>
      <div className="post-content" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <img src={image} alt="" />
        <div style={{ flexGrow: 1 }}>
          <h2 className='title'>{title}</h2>
          <p className="description">{description}</p>
        </div>
        <div style={{ width: '100%', marginTop: '10px' }}>
          <h2 className='tags'>{tags}</h2>
        </div>
        <div className="post-meta">
          <div className="post-buttons" style={{ marginLeft: 'auto' }}>
            <span className="post-date">2024.10.09</span>
            <button className="post-like-btn" onClick={handleButtonClick}>좋아요</button>
            <button className="post-delete-btn" onClick={handleButtonClick}>댓글</button>
          </div>
        </div>
      </div>
    </article>
  );
};

Post.propTypes = {
  region: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  tags: PropTypes.string,
  postId: PropTypes.string.isRequired // Pass unique postId for navigation
};

export default Post;
