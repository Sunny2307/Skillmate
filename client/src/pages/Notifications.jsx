import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const mockNotifications = [
    { id: '1', message: 'New swap request received!', createdAt: '2025-07-12' },
    { id: '2', message: 'Platform update: New features added.', createdAt: '2025-07-11' },
  ];

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link>  Notifications
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Notifications</h1>
      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div key={notification.id} className="card p-6">
            <p className="text-gray-600">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;