const Task = require('../models/Task');

// Get all tasks with search, filter, and sort
exports.getAllTasks = async (req, res) => {
  try {
    const { search, completed, priority, category, sortBy } = req.query;

    // Build filter object
    let filter = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by completion status
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    // Filter by priority
    if (priority) {
      filter.priority = priority;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Build sort object
    let sortObj = {};
    if (sortBy === 'newest') {
      sortObj = { createdAt: -1 };
    } else if (sortBy === 'oldest') {
      sortObj = { createdAt: 1 };
    } else if (sortBy === 'dueDate') {
      sortObj = { dueDate: 1 };
    } else {
      sortObj = { createdAt: -1 }; // Default: newest first
    }

    // Fetch tasks with filters and sorting
    const tasks = await Task.find(filter).sort(sortObj);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;

    // Validate title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, category, completed } =
      req.body;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (category !== undefined) task.category = category;
    if (completed !== undefined) task.completed = completed;

    task = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle task completion
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Toggle completed status
    task.completed = !task.completed;
    task = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task toggled successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
