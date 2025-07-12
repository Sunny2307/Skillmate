import React, { useState } from 'react';
import { validateInput } from '../utils/validateInput.js';
import { useAuth } from '../context/AuthContext.jsx';

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateInput({ email, password })) {
      setError('Please enter a valid email and password (minimum 6 characters)');
      setIsLoading(false);
      return;
    }

    try {
      const result = login(email, password);
      if (result.success) {
        console.log('Login successful!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Welcome to SkillSwap
        </h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          
          <button 
            type="button" 
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-md"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            Sign Up
          </button>
        </p>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo Account:</strong><br />
            Email: test@example.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
