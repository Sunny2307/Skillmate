import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const { db } = useContext(AuthContext);
  const mockSwaps = [
    {
      id: '1',
      requesterId: 'user1',
      offeredSkill: { name: 'Excel' },
      wantedSkill: { name: 'Photoshop' },
      status: 'pending',
    },
  ];

  const handleBanUser = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), { isBanned: true });
      alert('User banned');
    } catch (err) {
      console.error('Ban Error:', err);
      alert('Failed to ban user');
    }
  };

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link>  Admin Panel
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Pending Swaps</h2>
          {mockSwaps.map((swap) => (
            <div key={swap.id} className="p-4 bg-gray-50 rounded-lg mb-2">
              <p className="text-gray-600">Offered: {swap.offeredSkill.name} | Wanted: {swap.wantedSkill.name}</p>
              <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">Approve</button>
              <button className="mt-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-red-600">Reject</button>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Ban User</h2>
          <input
            type="text"
            placeholder="User ID"
            className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-accent"
            aria-label="User ID to ban"
          />
          <button
            onClick={() => handleBanUser('user1')}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-red-600"
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;