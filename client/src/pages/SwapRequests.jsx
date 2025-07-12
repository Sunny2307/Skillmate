import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SwapRequestCard from '../components/SwapRequestCard';

const SwapRequests = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const mockSwaps = [
    {
      id: '1',
      requesterId: 'user1',
      recipientId: 'user2',
      offeredSkill: { name: 'Excel', description: 'Advanced formulas' },
      wantedSkill: { name: 'Photoshop', description: 'Photo editing' },
      status: 'pending',
    },
  ];

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link> Swap Requests
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Swap Requests</h1>
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {['pending', 'accepted', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'} hover:bg-teal-600 hover:text-white`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {mockSwaps
          .filter((swap) => swap.status === activeTab)
          .map((swap) => (
            <SwapRequestCard key={swap.id} swap={swap} />
          ))}
      </div>
    </div>
  );
};

export default SwapRequests;