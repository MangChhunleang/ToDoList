const db = require('../config/db');

const createTodo = (todo) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO todos (title, description, completed, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
        db.query(sql, [todo.title, todo.description, todo.completed || false, todo.userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                findTodoById(results.insertId)
                    .then(todo => resolve(todo))
                    .catch(err => reject(err));
            }
        });
    });
};

const findTodoById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM todos WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const findTodosByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC';
        db.query(sql, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const updateTodo = (id, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updateData);
        values.push(id);
        const sql = `UPDATE todos SET ${fields}, updated_at = NOW() WHERE id = ?`;
        db.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM todos WHERE id = ?';
        db.query(sql, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    createTodo,
    findTodoById,
    findTodosByUserId,
    updateTodo,
    deleteTodo
}; 