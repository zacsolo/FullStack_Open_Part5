import React, { useState } from 'react';

import './BlogStyles.css';

//--React Functional Component,
//deconstructs blog from props
//displays blog title and author.
const BlogItem = ({ blog, addLikes, userName, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    const newBlogPost = {
      ...blog,
      user: { ...blog.user },
      likes: (blog.likes += 1),
    };
    addLikes(newBlogPost);
  };
  const handleDelete = () => {
    removeBlog(blog.id);
  };

  return (
    <div className='BlogItem-container'>
      <div className='BlogItem-title'>
        <h4>
          {blog.title} By {blog.author}
        </h4>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      <div
        className='Blog-Details'
        style={visible ? { display: '' } : { display: 'none' }}>
        <ul className='BlogItem-details'>
          <li>URL: {blog.url}</li>
          <li>
            Likes: {blog.likes}
            <button className='like-button' onClick={handleClick}>
              like
            </button>
          </li>
          <li>User: {blog.user.name}</li>
        </ul>
        {blog.user.username === userName && (
          <button onClick={handleDelete}>Delete Post</button>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
