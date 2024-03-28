// AuthForm.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig'; // Adjust the path based on your project structure

const auth = getAuth(firebaseApp);

const AuthForm = () => {
  const [email] = useState('');
  const [password] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful!');
      } else {
        // Register a new user
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful!');
      }
    } catch (error) {
      console.error('Authentication Error:', error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleAuth}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={toggleAuthMode}>
        {isLogin ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
      </p>
    </div>
  );
};
 
export default AuthForm;
