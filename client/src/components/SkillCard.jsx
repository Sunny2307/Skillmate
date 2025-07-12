import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SkillCard = ({ skill }) => {
  const { user, db } = useContext(AuthContext);

  const handleRequestSwap = async () => {
    if (!user) {
      alert('Please log in to request a swap');
      return;
    }
    try {
      const swapId = `${user.uid}_${skill.id}_${Date.now()}`;
      await setDoc(doc(db, 'swaps', swapId), {
        requesterId: user.uid,
        recipientId: skill.userId,
        offeredSkillId: null,
        wantedSkillId: skill.id,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      alert('Swap request sent!');
    } catch (error) {
      console.error('Swap Request Error:', error);
      alert('Failed to send swap request');
    }
  };

  return (
    <div className="card p-6 hover:animate-card-tilt" role="region" aria-label={`Skill: ${skill.name}`}>
      <h3 className="text-xl font-display text-dark">{skill.name}</h3>
      <p className="text-sm text-gray-600">{skill.type === 'offered' ? 'Offered' : 'Wanted'}</p>
      <p className="text-gray-600 truncate">{skill.description}</p>
      {user && user.uid !== skill.userId && (
        <button
          onClick={handleRequestSwap}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
          aria-label={`Request swap for ${skill.name}`}
        >
          Request Swap
        </button>
      )}
    </div>
  );
};

export default SkillCard;