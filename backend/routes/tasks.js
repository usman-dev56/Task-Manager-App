const express = require('express')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id
    })
    const savedTask = await task.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ message: 'Task not found' })

    Object.assign(task, req.body)
    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Toggle task completion
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ message: 'Task not found' })

    task.completed = !task.completed
    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ message: 'Task not found' })

    await Task.deleteOne({ _id: req.params.id })
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router