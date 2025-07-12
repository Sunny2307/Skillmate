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
  const navigate = useNavigate();

  // Filter users based on search input matching skillsOffered or skillsWanted
  const filteredUsers = mockUsers.filter(user =>
    user.skillsOffered.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
    user.skillsWanted.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white rounded-2xl shadow-xl w-full mt-6 sticky top-0 z-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          Skill Swap Platform
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/swap-requests')} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
            Swap request
          </button>
          <button onClick={() => navigate('/profile')} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
            Profile
          </button>
          {isAuthenticated ? (
            <button
              onClick={onLogoutClick}
              className="px-6 py-3 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-6 py-3 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-md"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Filter/Search Bar */}
      <div className="px-8 py-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto mt-8 mb-6">
        <div className="flex items-center gap-4">
          <select
            value={availability}
            onChange={e => setAvailability(e.target.value)}
            className="w-40 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400"
          >
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 flex-1 min-w-0"
          />
          <button className="px-6 py-3 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300 font-bold shadow-md">
            Search
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="px-8 space-y-6 max-w-4xl mx-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(u => (
            <div key={u.id} className="flex items-center bg-white rounded-2xl p-6 shadow-xl transform transition-all hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-8 border-2 border-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="emojiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#emojiGradient)"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                  <circle cx="9" cy="8" r="1.5" fill="#1F2937" />
                  <circle cx="15" cy="8" r="1.5" fill="#1F2937" />
                  <path fill="#1F2937" d="M8 13h8c-.55-.77-2.54-1.5-4-1.5s-3.45.73-4 1.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold mb-2 text-gray-900">{u.name}</div>
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
                  className="px-6 py-3 bg-blue-600 text-gray-900 rounded-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300 font-bold shadow-md"
                  style={{ letterSpacing: '0.5px' }}
                  onClick={() => navigate('/swap-detail')}
                >
                  Request
                </button>
                <div className="text-gray-500 text-sm">rating <span className="font-bold text-indigo-600">{u.rating}/5</span></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No users found with matching skills.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10 pb-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-2 rounded-lg border border-gray-200 font-semibold ${page === i + 1 ? 'bg-blue-600 text-gray-900 shadow-md' : 'bg-gray-50 text-gray-900 hover:bg-blue-500 hover:text-gray-900'} transition-all duration-300`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;