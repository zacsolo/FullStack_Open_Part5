import React, { useState } from 'react';

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('IN LOGIN FORM', username, password);
    handleLogin(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id='username'
          placeholder='Username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          id='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
