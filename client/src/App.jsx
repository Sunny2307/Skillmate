import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function AuthSwitcher() {
  const [showLogin, setShowLogin] = useState(true);

  return showLogin ? (
    <Login onSwitchToSignup={() => setShowLogin(false)} />
  ) : (
    <Register onSwitchToLogin={() => setShowLogin(true)} />
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthSwitcher />
    </AuthProvider>
  );
}

export default App;
