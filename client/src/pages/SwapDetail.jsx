import React from 'react';

export default function SwapDetail() {
  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-8 items-center">
          <span className="text-2xl font-bold text-blue-700">Skill Swap Platform</span>
          <button className="text-blue-700 font-semibold underline underline-offset-2">Swap request</button>
          <button className="text-blue-700 font-semibold underline underline-offset-2">Home</button>
        </div>
        <img src="https://ui-avatars.com/api/?name=Marc+Demo" alt="Profile" className="w-12 h-12 rounded-full border-2 border-blue-200" />
      </nav>
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow transition">Request</button>
            </div>
            <div className="mt-4 text-gray-600">Rating and Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
} 