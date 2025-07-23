import React, { useState } from 'react';

const TodoForm = ({ onSubmit, onCancel }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onSubmit({ title: task });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl shadow mb-6 dark:bg-gray-800 dark:border dark:border-gray-700">
      <input
        className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-slate-800 dark:bg-gray-900 dark:border-gray-700 dark:text-slate-100"
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={e => setTask(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-slate-900">Add</button>
      {onCancel && <button type="button" className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg font-semibold transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-slate-100" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TodoForm; 