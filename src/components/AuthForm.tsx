// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMessage("Verification email sent. Please check your inbox.");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user.emailVerified) {
          navigate('/account');
        } else {
          setError("Please verify your email before logging in.");
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button type="submit">{isSignUp ? 'Create Account' : 'Login'}</button>
      </form>
      <p onClick={() => {
        setIsSignUp(prev => !prev);
        setError('');
        setMessage('');
      }} style={{ cursor: 'pointer' }}>
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default AuthForm;
