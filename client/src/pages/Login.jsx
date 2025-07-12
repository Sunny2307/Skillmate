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
        // Login successful - you can redirect or update UI here
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Log In to SkillSwap</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up
          </button>
        </p>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
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