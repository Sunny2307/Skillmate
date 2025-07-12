import React, { useState } from 'react';

const mockRequests = [
  {
    id: 1,
    user: 'Marc Demo',
    photo: '',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Game Script'],
    status: 'Pending',
    rating: 3.9,
  },
  {
    id: 2,
    user: 'name',
    photo: '',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Game Script'],
    status: 'Rejected',
    rating: 3.9,
  },
];

const totalPages = 3;

export default function SwapRequests() {
  const [status, setStatus] = useState('Pending');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl border border-white/30 max-w-4xl w-full mx-auto p-10 mt-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Swap Requests</h2>
        {/* Filter/Search */}
        <div className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow mb-6 border border-gray-100">
          <select value={status} onChange={e => setStatus(e.target.value)} className="border border-gray-300 rounded px-4 py-2 text-[#222] bg-white focus:ring-2 focus:ring-blue-200">
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-300 rounded px-4 py-2 text-[#222] bg-white flex-1 focus:ring-2 focus:ring-blue-200" />
          <button className="bg-blue-600 text-black px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition">search</button>
        </div>
        {/* Requests */}
        <div className="space-y-6">
          {mockRequests.map(req => (
            <div key={req.id} className="flex items-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg mr-8 border-2 border-blue-100">
                <span className="text-sm">Profile Photo</span>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold mb-2 text-blue-800">{req.user}</div>
                <div className="mb-1">
                  <span className="text-green-600 font-medium">Skills Offered: </span>
                  {req.skillsOffered.map(skill => (
                    <span key={skill} className="inline-block bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mx-1 text-sm text-blue-700 font-semibold">{skill}</span>
                  ))}
                </div>
                <div className="mb-1">
                  <span className="text-blue-600 font-medium">Skill Wanted: </span>
                  {req.skillsWanted.map(skill => (
                    <span key={skill} className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1 mx-1 text-sm text-green-700 font-semibold">{skill}</span>
                  ))}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-bold">Status: </span>
                  <span className={req.status === 'Pending' ? 'text-blue-600' : req.status === 'Rejected' ? 'text-red-600' : 'text-green-600'}>{req.status}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {req.status === 'Pending' && (
                  <>
                    <button className="bg-green-600 hover:bg-green-700 text-black px-4 py-1 rounded-lg font-bold shadow transition">Accept</button>
                    <button className="bg-red-600 hover:bg-red-700 text-black px-4 py-1 rounded-lg font-bold shadow transition">Reject</button>
                  </>
                )}
                <div className="text-gray-500 text-sm mt-2">rating <span className="font-bold text-blue-700">{req.rating}/5</span></div>
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
              className={`px-3 py-1 rounded-full border border-gray-300 mx-1 font-semibold ${page === i + 1 ? 'bg-blue-600 text-black shadow' : 'bg-white text-black hover:bg-blue-50'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}