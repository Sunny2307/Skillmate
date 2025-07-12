import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock users for demonstration
  const mockUsers = [
    { email: 'test@example.com', password: 'password123', name: 'Test User' }
  ];

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setUser({ email: user.email, name: user.name });
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const register = (email, password, name) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    // In a real app, you'd save to a database
    mockUsers.push({ email, password, name });
    setUser({ email, name });
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
 