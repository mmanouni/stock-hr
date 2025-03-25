const express = require('express');
const router = express.Router();
const { Attendance } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all attendance records
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const attendances = await Attendance.findAll();
  res.json(attendances);
});

// Get a single attendance record by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const attendance = await Attendance.findByPk(req.params.id);
  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404).send('Attendance record not found');
  }
});

// Create a new attendance record
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.status(201).json(attendance);
});

// Update an attendance record by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const attendance = await Attendance.findByPk(req.params.id);
  if (attendance) {
    await attendance.update(req.body);
    res.json(attendance);
  } else {
    res.status(404).send('Attendance record not found');
  }
});

// Delete an attendance record by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const attendance = await Attendance.findByPk(req.params.id);
  if (attendance) {
    await attendance.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Attendance record not found');
  }
});

module.exports = router;
