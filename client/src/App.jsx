import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import SwapRequests from './pages/SwapRequests.jsx';
import SwapDetail from './pages/SwapDetail.jsx';
import SwapRequestForm from './pages/SwapRequestForm.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; // Assuming Register is in pages directory

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex gap-6 items-center px-8 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
      <Link to="/" className="text-blue-700 font-bold text-lg hover:underline">Home</Link>
      {user ? (
        <>
          <Link to="/profile" className="text-blue-700 font-bold text-lg hover:underline">Profile</Link>
          <Link to="/swap-requests" className="text-blue-700 font-bold text-lg hover:underline">Swap Requests</Link>
          <Link to="/swap-detail" className="text-blue-700 font-bold text-lg hover:underline">Swap Detail</Link>
          <Link to="/swap-request-form" className="text-blue-700 font-bold text-lg hover:underline">Swap Request Form</Link>
          <button
            onClick={logout}
            className="text-blue-700 font-bold text-lg hover:underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-700 font-bold text-lg hover:underline">Login</Link>
          <Link to="/register" className="text-blue-700 font-bold text-lg hover:underline">Register</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Placeholder while auth state loads
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/swap-requests"
          element={user ? <SwapRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/swap-detail"
          element={user ? <SwapDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/swap-request-form"
          element={user ? <SwapRequestForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;