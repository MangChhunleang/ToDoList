const {
  createTodo,
  findTodoById,
  findTodosByUserId,
  updateTodo,
  deleteTodo
} = require('../models/todoModel');

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debug log
    const todos = await findTodosByUserId(req.user.id);
    res.json(todos);
  } catch (err) {
    console.error('Error in getTodos:', err); // Debug log
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Create a new todo
const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await createTodo({
      title,
      description,
      completed: false,
      userId: req.user.id
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Update a todo
const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await updateTodo(id, { title, description });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete a todo
const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTodo(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

// Mark todo as complete/incomplete
const setTodoCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await updateTodo(id, { completed });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo status' });
  }
};

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  removeTodo,
  setTodoCompleted
}; 