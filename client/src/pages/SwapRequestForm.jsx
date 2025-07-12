import React, { useState } from 'react';

export default function SwapRequestForm() {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl border border-white/30 max-w-4xl w-full mx-auto p-10 mt-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Send Swap Request</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Offered Skill</label>
            <input
              type="text"
              value={offeredSkill}
              onChange={e => setOfferedSkill(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900"
              placeholder="Type your skill (e.g. JavaScript, Web Design)"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Skill You Want to Learn</label>
            <input
              type="text"
              value={wantedSkill}
              onChange={e => setWantedSkill(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900"
              placeholder="Type the skill you want to learn (e.g. Python, Game Design)"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white text-gray-900 min-h-[80px]" placeholder="Write a message..." />
          </div>
          <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 font-bold shadow-lg text-lg transition-colors">Submit</button>
        </form>
      </div>
    </div>
  );
} 