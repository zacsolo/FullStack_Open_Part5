import React, { useState } from 'react';

export default function BlogForm({ createNewBlogPost }) {
  const [newContent, setNewContent] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBlogPost(newContent);
    setNewContent({
      title: '',
      author: '',
      url: '',
    });
  };
  return (
    <form className='Blog-Form' onSubmit={handleSubmit}>
      <input
        id='title'
        placeholder='Blog Title'
        name='title'
        type='text'
        value={newContent.title}
        onChange={({ target }) =>
          setNewContent({ ...newContent, title: target.value })
        }
      />
      <input
        id='author'
        placeholder='Author'
        name='author'
        type='text'
        value={newContent.author}
        onChange={({ target }) =>
          setNewContent({ ...newContent, author: target.value })
        }
      />
      <input
        id='url'
        placeholder='Blog URL'
        name='url'
        type='text'
        value={newContent.url}
        onChange={({ target }) =>
          setNewContent({ ...newContent, url: target.value })
        }
      />
      <button type='submit'>Submit Post</button>
    </form>
  );
}
