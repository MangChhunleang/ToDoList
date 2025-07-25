import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import GoogleCallback from './components/GoogleCallback';
import { TodoProvider } from './context/TodoContext';
import TodoDashboard from './components/TodoDashboard';

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full flex flex-col bg-transparent">
          {/* Fixed full-screen background gradient */}
          <div className="fixed inset-0 -z-10 min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <TodoProvider>
            <div className="flex-1 ml-0">
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={<TodoDashboard />}
                  />

                  {/* Public Routes */}
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  <Route path="/auth/google/callback" element={<GoogleCallback />} />

                  {/* 404 Not Found */}
                  <Route path="*" element={<div className="text-center text-2xl text-gray-500">404 - Page Not Found</div>} />
                </Routes>
              </div>
            </div>
          </TodoProvider>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 