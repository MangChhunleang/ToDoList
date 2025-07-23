import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';

const navLinks = [
  { name: 'All Tasks', to: '/', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ) },
  { name: 'Completed', to: '/?filter=completed', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ) },
  { name: 'Important', to: '/?filter=important', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
];

const Sidebar = () => {
  const { user } = useAuth();
  const { filter, setFilter } = useTodos();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-lg fixed left-0 top-0 z-30">
      {/* Logo and App Name */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-purple-200 text-transparent bg-clip-text">My ToDo List</span>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => setFilter('all')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white/10 text-left ${filter === 'all' ? 'bg-white/10' : ''}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          All Tasks
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white/10 text-left ${filter === 'completed' ? 'bg-white/10' : ''}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Completed
        </button>
        <button
          onClick={() => setFilter('important')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white/10 text-left ${filter === 'important' ? 'bg-white/10' : ''}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Important
        </button>
      </nav>
      {/* User Section */}
      <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center font-bold text-lg">
          {user?.username ? user.username[0].toUpperCase() : <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <div>
          <div className="font-semibold">{user?.username || 'Guest'}</div>
          <div className="text-xs text-white/70">{user?.email || ''}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 