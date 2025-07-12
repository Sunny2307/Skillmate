import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 bg-dark text-white p-4 shadow-md z-10">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-display">SkillSwap</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
          <Link to="/browse" className="hover:text-accent transition-colors">Browse</Link>
          <Link to="/profile" className="hover:text-accent transition-colors">Profile</Link>
          <Link to="/swaps" className="hover:text-accent transition-colors">Swaps</Link>
          <Link to="/notifications" className="hover:text-accent transition-colors">Notifications</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-accent transition-colors">Admin</Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          {user ? (
            <Link to="/profile">
              <img src={user.photoURL || '/default-avatar.png'} alt="Avatar" className="w-10 h-10 rounded-full ring-2 ring-accent" />
            </Link>
          ) : (
            <Link to="/auth" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">Log In</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;