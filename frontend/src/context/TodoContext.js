import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LOCAL_KEY = 'todolist_guest_todos';
const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

const getLocalTodos = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
};

const setLocalTodos = (todos) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
};

export const TodoProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'important'

  // Fetch todos
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    if (isAuthenticated) {
      try {
        const res = await axios.get('/api/todos', { withCredentials: true });
        setTodos(res.data);
      } catch (err) {
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    } else {
      const local = getLocalTodos();
      setTodos(local);
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (todo) => {
    setLoading(true);
    setError(null);
    if (isAuthenticated) {
      try {
        const res = await axios.post('/api/todos', { title: todo.title }, { withCredentials: true });
        setTodos([res.data, ...todos]);
      } catch (err) {
        setError('Failed to add todo');
      } finally {
        setLoading(false);
      }
    } else {
      const newTodo = {
        title: todo.title,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = [newTodo, ...todos];
      setTodos(updated);
      setLocalTodos(updated);
      setLoading(false);
    }
  };

  // Edit a todo
  const editTodo = async (id, updates) => {
    setLoading(true);
    setError(null);
    if (isAuthenticated) {
      try {
        await axios.put(`/api/todos/${id}`, { title: updates.title }, { withCredentials: true });
        setTodos(todos.map(todo => todo.id === parseInt(id) ? { ...todo, ...updates } : todo));
      } catch (err) {
        setError('Failed to update todo');
      } finally {
        setLoading(false);
      }
    } else {
      const updated = todos.map(todo => todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo);
      setTodos(updated);
      setLocalTodos(updated);
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    if (isAuthenticated) {
      try {
        await axios.delete(`/api/todos/${id}`, { withCredentials: true });
        setTodos(todos.filter(todo => todo.id !== parseInt(id)));
      } catch (err) {
        setError('Failed to delete todo');
      } finally {
        setLoading(false);
      }
    } else {
      const updated = todos.filter(todo => todo.id !== id);
      setTodos(updated);
      setLocalTodos(updated);
      setLoading(false);
    }
  };

  // Mark as complete/incomplete
  const setTodoCompleted = async (id, completed) => {
    setLoading(true);
    setError(null);
    if (isAuthenticated) {
      try {
        await axios.patch(`/api/todos/${id}/complete`, { completed }, { withCredentials: true });
        setTodos(todos.map(todo => todo.id === parseInt(id) ? { ...todo, completed } : todo));
      } catch (err) {
        setError('Failed to update todo status');
      } finally {
        setLoading(false);
      }
    } else {
      const updated = todos.map(todo => todo.id === id ? { ...todo, completed, updatedAt: new Date().toISOString() } : todo);
      setTodos(updated);
      setLocalTodos(updated);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  // Filtered todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'important') return todo.important;
    return true;
  });

  return (
    <TodoContext.Provider value={{ todos: filteredTodos, loading, error, fetchTodos, addTodo, editTodo, deleteTodo, setTodoCompleted, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
}; 