import React, { useState } from 'react';
import { validateInput } from '../utils/validateInput.js';
import { useAuth } from '../context/AuthContext.jsx';

const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { register } = useAuth();

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateInput({ email, name })) {
      setError('Please enter a valid name and email.');
      setIsLoading(false);
      return;
    }

    // Placeholder for OTP sending logic
    // TODO: Implement OTP sending logic here
    console.log('OTP sent to:', email);
    setIsOtpSent(true);
    setIsLoading(false);
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }

      // Check if OTP is complete
      if (newOtp.every((digit) => digit !== '')) {
        // Placeholder for OTP verification logic
        // TODO: Implement OTP verification logic here
        console.log('OTP entered:', newOtp.join(''));
        setIsOtpVerified(true);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!validateInput({ email, password, name })) {
      setError('Please enter valid information. Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      const result = register(email, password, name);
      if (result.success) {
        console.log('Registration successful!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          Join SkillSwap
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
              required
              disabled={isOtpSent}
            />
          </div>

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
              disabled={isOtpSent}
            />
          </div>

          {!isOtpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-md"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          ) : !isOtpVerified ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="flex space-x-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 p-3 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900"
                    required
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full px-6 py-4 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-md"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </>
          )}
        </div>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;