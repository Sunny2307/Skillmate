import React, { useState } from 'react';

export default function SwapRequestForm() {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#f3f6f8] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Send Swap Request</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Choose one of your offered skills</label>
            <select value={offeredSkill} onChange={e => setOfferedSkill(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900">
              <option value="">Select a skill</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Web Design">Web Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Choose one of their wanted skills</label>
            <select value={wantedSkill} onChange={e => setWantedSkill(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900">
              <option value="">Select a skill</option>
              <option value="Python">Python</option>
              <option value="Game Design">Game Design</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900 min-h-[80px]" placeholder="Write a message..." />
          </div>
          <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-lg text-lg transition-colors">Submit</button>
        </form>
      </div>
    </div>
  );
} 