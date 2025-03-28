const express = require('express');
const router = express.Router();
const { Department } = require('../models');
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

// Get all departments
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const departments = await Department.findAll();
  res.json(departments);
});

// Get a single department by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (department) {
    res.json(department);
  } else {
    res.status(404).send('Department not found');
  }
});

// Create a new department
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const department = await Department.create(req.body);
  res.status(201).json(department);
});

// Update a department by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (department) {
    await department.update(req.body);
    res.json(department);
  } else {
    res.status(404).send('Department not found');
  }
});

// Delete a department by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  if (department) {
    await department.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Department not found');
  }
});

// Public route to get departments without authentication
router.get('/public', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});


module.exports = router;
