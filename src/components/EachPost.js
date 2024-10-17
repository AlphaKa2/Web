// Post.js
import React from 'react';
import PropTypes from 'prop-types';
import './EachPost.css';

const Post = ({ region, title, description, image, tags}) => (
  <article className={`post-item ${region}`}>
    <div className="p_1" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <img src={image} alt="" />
      <div style={{ flexGrow: 1 }}>
        <h2 className='title'>{title}</h2>
        <p>{description}</p>
      </div>
      <div style={{ width: '100%', marginTop: '10px' }}>
        <h2 className='tags'>{tags}</h2>
      </div>
      <div className="post-meta">
        <div className="post-buttons" style={{ marginLeft: 'auto' }}>
          <span className="post-date">2024.10.09</span>
          <button className="edit-btn">좋아요</button>
          <button className="delete-btn">댓글</button>
        </div>
      </div>
    </div>
  </article>
);

Post.propTypes = {
  region: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Post;
