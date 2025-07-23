import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoForm from './TodoForm';

const TodoItem = ({ todo }) => {
  const { deleteTodo, setTodoCompleted, editTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const { editTodo: editTodoContext } = useTodos();

  const handleToggle = () => setTodoCompleted(todo.id, !todo.completed);
  const handleDelete = () => deleteTodo(todo.id);
  const handleEdit = (updates) => {
    editTodo(todo.id, updates);
    setEditing(false);
  };
  const handleToggleImportant = () => {
    editTodoContext(todo.id, { ...todo, important: !todo.important });
  };

  if (editing) {
    return <TodoForm initial={{ title: todo.title }} onSubmit={handleEdit} onCancel={() => setEditing(false)} />;
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl shadow bg-white border transition group ${todo.completed ? 'opacity-60 line-through' : 'hover:shadow-lg'} ${todo.important ? 'border-yellow-400 bg-yellow-50 dark:border-yellow-400 dark:bg-yellow-900/30' : 'dark:bg-gray-800 dark:border-gray-700'}`}>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={handleToggle} className="h-5 w-5 text-blue-600 rounded focus:ring-blue-400 transition dark:bg-gray-900 dark:border-gray-700" />
        <div className="font-semibold text-lg text-slate-800 dark:text-slate-100">{todo.title}</div>
        <button
          className={`ml-2 ${todo.important ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400 dark:text-slate-500 dark:hover:text-yellow-400'} transition`}
          title={todo.important ? 'Unmark as important' : 'Mark as important'}
          onClick={handleToggleImportant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={todo.important ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400" title="Edit" onClick={() => setEditing(true)}>
          {/* Pencil icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
          </svg>
        </button>
        {!todo.important && (
          <button className="text-rose-600 hover:text-rose-800 dark:text-rose-300 dark:hover:text-rose-400" title="Delete" onClick={handleDelete}>
            {/* Trash can icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem; 