const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all employees
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

// Get a single employee by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Create a new employee
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
});

// Update an employee by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    await employee.update(req.body);
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Delete an employee by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (employee) {
    await employee.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Employee not found');
  }
});

module.exports = router;
