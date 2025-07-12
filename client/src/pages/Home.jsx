import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  {
    id: 1,
    name: 'Marc Demo',
    photo: '',
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 3.9,
  },
  {
    id: 2,
    name: 'Michell',
    photo: '',
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 2.5,
  },
  {
    id: 3,
    name: 'Joe wills',
    photo: '',
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 4.0,
  },
];

const totalPages = 7;

function Home({ isAuthenticated, onLoginClick, onLogoutClick }) {
  const [search, setSearch] = React.useState('');
  const [availability, setAvailability] = React.useState('');
  const [page, setPage] = React.useState(1);
  const users = mockUsers;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-[#222] font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight cursor-pointer" onClick={() => navigate('/')}>Skill Swap Platform</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/swap-requests')} className="text-blue-700 font-semibold underline underline-offset-2">Swap request</button>
          <button onClick={() => navigate('/profile')} className="text-blue-700 font-semibold underline underline-offset-2">Profile</button>
          {isAuthenticated ? (
            <button
              onClick={onLogoutClick}
              className="bg-blue-600 px-6 py-2 rounded text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-blue-600 px-6 py-2 rounded text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Filter/Search Bar */}
      <div className="flex items-center gap-4 px-8 py-6 bg-white shadow rounded-lg max-w-4xl mx-auto mt-8 mb-6">
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-[#222] bg-white focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Availability</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
        </select>
        <input
          type="text"
          placeholder="Search skills or users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-[#222] bg-white flex-1 focus:ring-2 focus:ring-blue-200"
        />
        <button className="bg-blue-600 px-6 py-2 rounded text-white font-semibold shadow hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* User Cards */}
      <div className="px-8 space-y-6 max-w-4xl mx-auto">
        {users.map(u => (
          <div key={u.id} className="flex items-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg mr-8 border-2 border-blue-100">
              <span className="text-sm">Profile Photo</span>
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold mb-2 text-blue-800">{u.name}</div>
              <div className="mb-1">
                <span className="text-green-600 font-medium">Skills Offered: </span>
                {u.skillsOffered.map(skill => (
                  <span key={skill} className="inline-block bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mx-1 text-sm text-blue-700 font-semibold">{skill}</span>
                ))}
              </div>
              <div className="mb-1">
                <span className="text-blue-600 font-medium">Skill Wanted: </span>
                {u.skillsWanted.map(skill => (
                  <span key={skill} className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1 mx-1 text-sm text-green-700 font-semibold">{skill}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold shadow-lg text-lg transition border border-blue-700"
                style={{ letterSpacing: '0.5px' }}
                onClick={() => navigate('/swap-detail')}
              >
                Request
              </button>
              <div className="text-gray-500 text-sm">rating <span className="font-bold text-blue-700">{u.rating}/5</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10 pb-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-full border border-gray-300 mx-1 font-semibold ${page === i + 1 ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home; 