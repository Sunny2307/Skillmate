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

function Home({ isAuthenticated, onLogoutClick }) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Discover & Exchange Skills
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Connect with talented individuals and grow your skillset through meaningful exchanges
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400"
                />
              </div>
              <select
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="px-6 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-700 min-w-[150px]"
              >
                <option value="">Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
              <button className="px-8 py-4 bg-teal-100 text-black font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* User Cards */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(u => (
              <div key={u.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-teal-400 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24">
                        <path
                          fill="#ccfbf1"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
                        />
                        <circle cx="9" cy="8" r="1.5" fill="#1F2937" />
                        <circle cx="15" cy="8" r="1.5" fill="#1F2937" />
                        <path fill="#1F2937" d="M8 13h8c-.55-.77-2.54-1.5-4-1.5s-3.45.73-4 1.5z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-800">{u.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-sm font-semibold text-yellow-700">{u.rating}/5</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          Offers:
                        </span>
                        {u.skillsOffered.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          Wants:
                        </span>
                        {u.skillsWanted.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className="px-6 py-3 bg-teal-100 text-black font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 group-hover:gap-3"
                    onClick={() => navigate('/swap-detail')}
                  >
                    Request
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No matches found</h3>
              <p className="text-slate-500">Try adjusting your search criteria to find more users.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                page === i + 1 
                  ? 'bg-teal-100 text-black shadow-lg scale-110' 
                  : 'bg-white/70 text-black hover:bg-white hover:shadow-md hover:scale-105 border border-slate-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;