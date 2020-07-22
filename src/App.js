import React, { useState, useEffect, useRef } from 'react';
import BlogItem from './components/BlogItem';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Toggle from './components/Toggle';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  //__ALL STATE___________________________________________
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [user, setUser] = useState();
  //______________________________________________________
  const blogRef = useRef();

  //blogService.getll fetches all the data from the Blogs DB root route
  //then we'll set the blogs in state as the array we just received
  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchBlogs();
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setLoggedIn(true);
      blogService.setToken(user.token);
    }
  }, []);

  //Handling the login form submission.
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      if (user.token) {
        setLoggedIn(true);
      }
    } catch (exception) {
      setFailedLogin(true);
      console.log(' NOT LOGEED IN, SOMETHING WENT WRONG');
    }
  };
  //Handling the Blog form submission.
  const createNewBlogPost = async (newContent) => {
    blogRef.current.toggleVisibility();
    await blogService.create(newContent);
    const newBlogs = await blogService.getAll();
    await setBlogs(newBlogs);
    setSuccess(true);
  };

  //Updating Likes of a Blog PUT REQUEST
  const addLikes = async (blogContent) => {
    console.log('ID', blogContent.id);
    const response = await blogService.update(blogContent.id, blogContent);
    if (response) {
      const allBlogs = await blogService.getAll();
      console.log('LIKE UPDATER, ____FETCHING ALL BLOGS____', allBlogs);
      const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    } else {
      console.log('ERROR ADD LIKES DID NOT GO AS EXPECTED');
    }
  };
  //Removes A blog from our list
  const removeBlog = async (id) => {
    if (window.confirm('Do you really want to delete this blog post?')) {
      await blogService.remove(id, user.token);
      const newBlogs = await blogService.getAll();
      await setBlogs(newBlogs);
    } else {
      console.log('DID NOT DELETE');
    }
  };

  //Deletes local storage and logs us out
  const logout = () => {
    setLoggedIn(false);
    window.localStorage.clear();
  };

  //Strictly presentational.
  const successfulPost = () => {
    const blogInfo = blogs[blogs.length - 1];
    const { title, author } = blogInfo;
    setTimeout(() => {
      setSuccess(false);
    }, 500);
    return (
      <div className='success-posting'>
        <p>
          A new blog titled "{title}" by {author} has been posted
        </p>
      </div>
    );
  };

  //presentational
  const badLoginMessage = () => {
    return (
      <div className='failure-login'>
        <p>Wrong username or password</p>
      </div>
    );
  };

  //ALL RETURNED JSX
  return (
    <div>
      {!loggedIn ? (
        <div className='LoginPage'>
          <h3>Sign In To Acces Your Blog Posts</h3>
          {failedLogin && badLoginMessage()}
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>Add a new Blog Post</h2>
          {success && successfulPost()}
          <p>Welcome {user.name}</p>
          <Toggle buttonLabel='Create New Blog' ref={blogRef}>
            <BlogForm createNewBlogPost={createNewBlogPost} />
          </Toggle>
          <h2>Blogs</h2>
          {console.log(' NEW APP RENDERING')}
          {blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              userName={user.username}
              addLikes={addLikes}
              removeBlog={removeBlog}
            />
          ))}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
