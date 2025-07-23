console.log('todo.js routes loaded');
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const requireAuth = require('../config/passport').requireAuth; // adjust if needed

router.use((req, res, next) => {
  console.log('Request to /api/todos:', req.method, req.url, 'user:', req.user);
  next();
});

// All routes require authentication
router.use(requireAuth);

// GET /todos - list all todos for user
router.get('/', todoController.getTodos);

// POST /todos - create new todo
router.post('/', todoController.addTodo);

// PUT /todos/:id - update todo
router.put('/:id', todoController.editTodo);

// DELETE /todos/:id - delete todo
router.delete('/:id', todoController.removeTodo);

// PATCH /todos/:id/complete - mark as complete/incomplete
router.patch('/:id/complete', todoController.setTodoCompleted);

router.get('/test', (req, res) => {
  res.json({ message: 'Test route works', user: req.user });
});

module.exports = router; 