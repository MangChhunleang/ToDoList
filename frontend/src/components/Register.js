import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await register(username, email, password);
    setLoading(false);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Sign Up</h2>
      {error && (
        <div className="flex items-center gap-2 mb-4 text-rose-600 dark:text-rose-300">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {/* User icon */}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </span>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-slate-100"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {/* User icon */}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </span>
          <input
            type="email"
            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-slate-100"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {/* Lock icon */}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm6 4v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5m12 0H6" /></svg>
          </span>
          <input
            type="password"
            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-slate-100"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow transition dark:bg-emerald-300 dark:hover:bg-emerald-400 dark:text-slate-900"
          disabled={loading}
        >
          {loading ? (
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14v6m3-3h-6m-2-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 10-8 0 4 4 0 008 0z" /></svg>
          )}
          Sign Up
        </button>
      </form>
      <div className="mt-6">
        <a
          href="http://localhost:5000/api/auth/google"
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 py-2 rounded-lg font-semibold shadow transition hover:bg-slate-50 dark:bg-gray-800 dark:border-gray-600 dark:text-slate-100 dark:hover:bg-gray-700"
        >
          {/* Google icon */}
          <svg className="h-5 w-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.92-6.92C36.3 2.36 30.51 0 24 0 14.82 0 6.73 5.06 2.69 12.44l8.06 6.26C12.6 13.13 17.88 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.6C43.27 37.27 46.1 31.41 46.1 24.5z"/><path fill="#FBBC05" d="M10.75 28.7c-1.13-3.36-1.13-6.98 0-10.34l-8.06-6.26C.98 15.18 0 19.45 0 24c0 4.55.98 8.82 2.69 12.44l8.06-6.26z"/><path fill="#EA4335" d="M24 48c6.51 0 12.3-2.36 16.16-6.31l-7.18-5.6c-2.01 1.35-4.58 2.14-8.98 2.14-6.12 0-11.4-3.63-13.25-8.7l-8.06 6.26C6.73 42.94 14.82 48 24 48z"/></g></svg>
          Sign up with Google
        </a>
      </div>
    </div>
  );
};

export default Register; 