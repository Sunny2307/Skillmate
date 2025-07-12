import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import SkillCard from '../components/SkillCard';
import { validateInput } from '../utils/validateInput';

const Profile = () => {
  const { user, db } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    location: user?.location || '',
    availability: user?.availability || '',
    isPublic: user?.isPublic ?? true,
  });
  const [error, setError] = useState(null);
  const mockSkills = [
    { id: '1', name: 'Photoshop', type: 'offered', description: 'Expert in photo editing', userId: user?.uid },
    { id: '2', name: 'Excel', type: 'wanted', description: 'Learn advanced formulas', userId: user?.uid },
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateInput(formData)) {
      setError('Invalid input');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), formData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link>  Profile
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Your Profile</h1>
      <div className="card p-6 max-w-md mx-auto">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto ring-4 ring-accent"
        />
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
              aria-label="Full Name"
            />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
              aria-label="Location"
            />
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
              aria-label="Availability"
            />
            <label className="flex items-center gap-2">
              <span className="text-gray-600">Public Profile</span>
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="toggle toggle-primary"
              />
            </label>
            {error && <p className="text-accent" role="alert">{error}</p>}
            <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">
              Save
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-dark mt-4">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.location || 'No location set'}</p>
            <p className="text-gray-600">Availability: {user?.availability || 'Not set'}</p>
            <p className="text-gray-600">Profile: {user?.isPublic ? 'Public' : 'Private'}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-dark mb-4">Your Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;