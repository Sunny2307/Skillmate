import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import SwapRequests from './pages/SwapRequests.jsx';
import SwapDetail from './pages/SwapDetail.jsx';
import SwapRequestForm from './pages/SwapRequestForm.jsx';

function NavBar() {
  return (
    <nav className="flex gap-6 items-center px-8 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
      <Link to="/" className="text-blue-700 font-bold text-lg hover:underline">Home</Link>
      <Link to="/profile" className="text-blue-700 font-bold text-lg hover:underline">Profile</Link>
      <Link to="/swap-requests" className="text-blue-700 font-bold text-lg hover:underline">Swap Requests</Link>
      <Link to="/swap-detail" className="text-blue-700 font-bold text-lg hover:underline">Swap Detail</Link>
      <Link to="/swap-request-form" className="text-blue-700 font-bold text-lg hover:underline">Swap Request Form</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/swap-requests" element={<SwapRequests />} />
        <Route path="/swap-detail" element={<SwapDetail />} />
        <Route path="/swap-request-form" element={<SwapRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;
