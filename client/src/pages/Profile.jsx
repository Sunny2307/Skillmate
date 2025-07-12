import React, { useState } from 'react';

const initialProfile = {
  name: 'Cheerful Raven',
  location: 'New York',
  skillsOffered: ['JavaScript', 'Web design', 'Photoshop'],
  skillsWanted: ['Python', 'Game design'],
  availability: 'weekends',
  profileType: 'Public',
  photo: '',
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [error, setError] = useState(null);
  const mockSkills = [
    { id: '1', name: 'Photoshop', type: 'offered', description: 'Expert in photo editing', userId: 'user1' },
    { id: '2', name: 'Excel', type: 'wanted', description: 'Learn advanced formulas', userId: 'user1' },
  ];

  const handleEdit = () => {
    setEditing(true);
    setTempProfile(profile);
  };
  const handleDiscard = () => {
    setEditing(false);
    setTempProfile(profile);
  };
  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-8 items-center">
          <span className="text-2xl font-bold text-blue-700">User profile <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-2 text-base font-semibold">{profile.name}</span></span>
          <button className="text-blue-700 font-semibold underline underline-offset-2">Swap request</button>
          <button className="text-blue-700 font-semibold underline underline-offset-2">Home</button>
        </div>
        <img src={profile.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name)} alt="Profile" className="w-12 h-12 rounded-full border-2 border-blue-200" />
      </nav>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10 p-8 border border-gray-100">
        <div className="flex gap-8 items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg border-2 border-blue-100 relative">
            <img src={profile.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name)} alt="Profile" className="w-full h-full object-cover rounded-full" />
            <button className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold shadow">Edit</button>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Name</label>
              {editing ? (
                <input className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.name} onChange={e => setTempProfile({ ...tempProfile, name: e.target.value })} />
              ) : (
                <span>{profile.name}</span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Location</label>
              {editing ? (
                <input className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.location} onChange={e => setTempProfile({ ...tempProfile, location: e.target.value })} />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Skills Offered</label>
              {editing ? (
                <input className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.skillsOffered.join(', ')} onChange={e => setTempProfile({ ...tempProfile, skillsOffered: e.target.value.split(',').map(s => s.trim()) })} />
              ) : (
                <span>{profile.skillsOffered.map(skill => <span key={skill} className="inline-block bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mx-1 text-sm text-blue-700 font-semibold">{skill}</span>)}</span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Skills wanted</label>
              {editing ? (
                <input className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.skillsWanted.join(', ')} onChange={e => setTempProfile({ ...tempProfile, skillsWanted: e.target.value.split(',').map(s => s.trim()) })} />
              ) : (
                <span>{profile.skillsWanted.map(skill => <span key={skill} className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1 mx-1 text-sm text-green-700 font-semibold">{skill}</span>)}</span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Availability</label>
              {editing ? (
                <input className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.availability} onChange={e => setTempProfile({ ...tempProfile, availability: e.target.value })} />
              ) : (
                <span>{profile.availability}</span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold w-28">Profile</label>
              {editing ? (
                <select className="border border-gray-300 rounded px-3 py-1 flex-1" value={tempProfile.profileType} onChange={e => setTempProfile({ ...tempProfile, profileType: e.target.value })}>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              ) : (
                <span>{profile.profileType}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-8">
          {editing ? (
            <>
              <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-green-700">Save</button>
              <button onClick={handleDiscard} className="bg-red-100 text-red-600 px-6 py-2 rounded font-bold shadow hover:bg-red-200">Discard</button>
            </>
          ) : (
            <button onClick={handleEdit} className="bg-blue-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-blue-700">Edit Profile</button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-dark mb-4">Your Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSkills.map((skill) => (
            <div key={skill.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 font-semibold shadow">
              <div>{skill.name}</div>
              <div className="text-xs text-blue-600 mt-1">{skill.type === 'offered' ? 'Offered' : 'Wanted'}</div>
              <div className="text-xs text-gray-500 mt-2">{skill.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;