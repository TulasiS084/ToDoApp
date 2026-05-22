const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Routes
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTaskCompletion);
router.delete('/:id', deleteTask);

module.exports = router;
