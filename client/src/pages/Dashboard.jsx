import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const mockSkills = [
    { id: '1', name: 'Photoshop', type: 'offered', description: 'Expert in photo editing', userId: '123' },
    { id: '2', name: 'Excel', type: 'wanted', description: 'Learn advanced formulas', userId: '123' },
  ];

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link>  Dashboard
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Welcome, {user?.displayName || 'User'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Your Skills</h2>
          <div className="space-y-4">
            {mockSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          <Link to="/profile" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">
            Add Skill
          </Link>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Recent Swaps</h2>
          <p className="text-gray-600">No recent swaps. <Link to="/browse" className="text-accent hover:underline">Browse skills</Link> to start!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;