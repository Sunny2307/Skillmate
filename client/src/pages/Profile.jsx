import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: '',
    profileType: 'Public',
    photo: '',
  });
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
          setTempProfile(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
    setTempProfile(profile);
  };

  const handleDiscard = () => {
    setEditing(false);
    setTempProfile(profile);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: tempProfile.name,
          location: tempProfile.location,
          skillsOffered: tempProfile.skillsOffered,
          skillsWanted: tempProfile.skillsWanted,
          availability: tempProfile.availability,
          isPublic: tempProfile.profileType === 'Public',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(tempProfile);
        setEditing(false);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileComplete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/me/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          password: tempProfile.password, // Add password field to tempProfile state
          availability: tempProfile.availability,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setProfile({ ...tempProfile, profileComplete: true });
        setEditing(false);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to complete profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-[#f3f6f8] flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        <div className="h-40 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 rounded-t-xl"></div>
        <div className="absolute left-1/2 top-36 transform -translate-x-1/2 z-10">
          <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
            <img
              src={profile.photo || 'https://randomuser.me/api/portraits/men/32.jpg'}
              alt="Profile"
              className="w-full h-full object-cover"
              style={{ background: '#e0e7ef' }}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-b-xl shadow-lg border border-gray-100 pt-40 pb-8 px-8 relative -mt-12 flex flex-col items-center">
        <div className="flex flex-col items-center w-full mt-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl font-extrabold text-gray-900" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.25), 0 1px 0 #fff' }}>
              {profile.name}
            </span>
            <span className="ml-1 text-purple-600 text-2xl" title="Verified">✔️</span>
          </div>
          <div className="text-gray-500 text-base flex items-center gap-2">
            {profile.location} · <a href="#" className="text-purple-600 hover:underline">Contact info</a>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow border border-gray-100 mt-8 p-8 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-2 text-xl font-semibold text-gray-800">Skills Offered</div>
          <div className="flex flex-wrap gap-3 mb-6">
            {profile.skillsOffered.map((skill) => (
              <span key={skill} className="inline-block bg-blue-50 border border-blue-300 rounded-full px-4 py-2 text-base text-blue-700 font-semibold shadow-sm">
                {skill}
              </span>
            ))}
          </div>
          <div className="mb-2 text-xl font-semibold text-gray-800">Skills Wanted</div>
          <div className="flex flex-wrap gap-3">
            {profile.skillsWanted.map((skill) => (
              <span key={skill} className="inline-block bg-green-50 border border-green-300 rounded-full px-4 py-2 text-base text-green-700 font-semibold shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col gap-4 bg-[#f8fafc] rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="text-xl font-semibold text-gray-800 mb-2">Edit Profile</div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Name</label>
            {editing ? (
              <input
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
              />
            ) : (
              <div className="text-base text-gray-700">{profile.name}</div>
            )}
            <label className="font-semibold">Location</label>
            {editing ? (
              <input
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.location}
                onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
              />
            ) : (
              <div className="text-base text-gray-700">{profile.location}</div>
            )}
            <label className="font-semibold">Skills Offered</label>
            {editing ? (
              <input
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.skillsOffered.join(', ')}
                onChange={(e) => setTempProfile({ ...tempProfile, skillsOffered: e.target.value.split(',').map((s) => s.trim()) })}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill) => (
                  <span key={skill} className="inline-block bg-blue-50 border border-blue-300 rounded-full px-3 py-1 text-sm text-blue-700 font-semibold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <label className="font-semibold">Skills Wanted</label>
            {editing ? (
              <input
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.skillsWanted.join(', ')}
                onChange={(e) => setTempProfile({ ...tempProfile, skillsWanted: e.target.value.split(',').map((s) => s.trim()) })}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill) => (
                  <span key={skill} className="inline-block bg-green-50 border border-green-300 rounded-full px-3 py-1 text-sm text-green-700 font-semibold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <label className="font-semibold">Availability</label>
            {editing ? (
              <input
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.availability}
                onChange={(e) => setTempProfile({ ...tempProfile, availability: e.target.value })}
              />
            ) : (
              <div className="text-base text-gray-700">{profile.availability}</div>
            )}
            <label className="font-semibold">Profile Type</label>
            {editing ? (
              <select
                className="border border-gray-300 rounded px-3 py-2 text-base"
                value={tempProfile.profileType}
                onChange={(e) => setTempProfile({ ...tempProfile, profileType: e.target.value })}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            ) : (
              <div className="text-base text-gray-700">{profile.profileType}</div>
            )}
            {!profile.profileComplete && editing && (
              <div>
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  className="border border-gray-300 rounded px-3 py-2 text-base"
                  value={tempProfile.password || ''}
                  onChange={(e) => setTempProfile({ ...tempProfile, password: e.target.value })}
                  placeholder="Set your password"
                />
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {editing ? (
              <>
                {profile.profileComplete ? (
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button
                    onClick={handleProfileComplete}
                    disabled={isLoading || !tempProfile.password || !tempProfile.availability}
                    className="bg-indigo-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Completing...' : 'Complete Profile'}
                  </button>
                )}
                <button
                  onClick={handleDiscard}
                  className="bg-red-100 text-black px-6 py-2 rounded font-bold shadow hover:bg-red-200"
                >
                  Discard
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-indigo-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={logout}
              className="bg-gray-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;