import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

const SwapRequestCard = ({ swap }) => {
  const { user, db } = useContext(AuthContext);

  const handleAction = async (action) => {
    try {
      await updateDoc(doc(db, 'swaps', swap.id), {
        status: action,
        updatedAt: new Date(),
      });
      alert(`Swap ${action}!`);
    } catch (error) {
      console.error('Swap Action Error:', error);
      alert('Failed to update swap');
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-dark">Swap Request</h3>
      <p className="text-gray-600">From: User {swap.requesterId}</p>
      <p className="text-gray-600">Offered: {swap.offeredSkill.name}</p>
      <p className="text-gray-600">Wanted: {swap.wantedSkill.name}</p>
      <p className="text-gray-600">Status: {swap.status}</p>
      {user?.uid === swap.recipientId && swap.status === 'pending' && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleAction('accepted')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction('rejected')}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={() => handleAction('cancelled')}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapRequestCard;