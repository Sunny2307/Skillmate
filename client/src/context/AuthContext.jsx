import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    if (token && uid) {
      setUser({ uid });
    }
    setLoading(false);
  }, []);

  const sendOtp = async (email, name) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    setLoading(false);
    return data;
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    setLoading(false);
    return data;
  };

  const signup = async (email, name) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('uid', data.uid);
      setUser({ uid: data.uid });
      if (data.isNewUser) {
        window.location.href = '/complete-profile';
      }
    } else {
      throw new Error(data.error);
    }
    setLoading(false);
    return { success: response.ok, error: data.error };
  };

  const login = async (email, password) => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('uid', data.uid);
      setUser({ uid: data.uid });
      if (data.isNewUser) {
        window.location.href = '/complete-profile';
      }
    } else {
      throw new Error(data.error);
    }
    setLoading(false);
    return { success: response.ok, error: data.error };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setUser(null);
  };

  return { user, loading, signup, login, sendOtp, verifyOtp, logout };
};

export const AuthProvider = ({ children }) => {
  return children;
};