import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { validateInput } from '../utils/validateInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput({ email, password })) {
      setError('Invalid input');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
      <div className="card p-8 max-w-md w-full">
        <h1 className="text-3xl font-display text-dark mb-6 text-center">Log In to SkillSwap</h1>
        {error && <p className="text-accent mb-4" role="alert">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
            aria-label="Password"
          />
          <button type="submit" className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-teal-600">
            Log In
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          New here? <Link to="/" className="text-accent hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;