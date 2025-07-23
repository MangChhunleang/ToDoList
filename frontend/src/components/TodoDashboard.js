import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useAuth } from '../context/AuthContext';

const TodoDashboard = () => {
  const { addTodo } = useTodos();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex justify-center items-start min-h-[70vh] py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 dark:bg-gray-900 dark:border dark:border-gray-700">
        {isAuthenticated && (
          <div className="mb-4 text-green-600 text-xl font-bold">
            Welcome{user ? `, ${user.name}` : ''}! You have successfully logged in.
          </div>
        )}
        <h1 className="text-3xl font-extrabold text-center mb-6 text-slate-900 dark:text-white">My ToDo List</h1>
        <TodoForm onSubmit={addTodo} />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoDashboard; 