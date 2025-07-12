import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';

function AuthModal({ show, onClose }) {
  const [showLogin, setShowLogin] = useState(true);
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg shadow-2xl p-8 min-w-[350px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold bg-gray-100 rounded-full px-2 py-1 hover:bg-gray-200 transition">&times;</button>
        {showLogin ? (
          <Login onSwitchToSignup={() => setShowLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Home
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={logout}
      />
      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
