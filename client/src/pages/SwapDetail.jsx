import React from 'react';

export default function SwapDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl border border-white/30 max-w-4xl w-full mx-auto p-10 mt-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Swap Detail</h2>
        <div className="flex gap-8 items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg border-2 border-blue-100">
            <span className="text-sm">Profile Photo</span>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold mb-2 text-blue-800">Marc Demo</div>
            <div className="mb-1">
              <span className="text-green-600 font-medium">Skills Offered: </span>
              <span className="inline-block bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mx-1 text-sm text-blue-700 font-semibold">JavaScript</span>
            </div>
            <div className="mb-1">
              <span className="text-blue-600 font-medium">Skill Wanted: </span>
              <span className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1 mx-1 text-sm text-green-700 font-semibold">Python</span>
            </div>
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-2 rounded-lg font-bold shadow transition">Request</button>
            </div>
            <div className="mt-4 text-gray-600">Rating and Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
} 