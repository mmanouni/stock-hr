const express = require('express');
const router = express.Router();
const { Payroll } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all payroll records
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const payrolls = await Payroll.findAll();
  res.json(payrolls);
});

// Get a single payroll record by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const payroll = await Payroll.findByPk(req.params.id);
  if (payroll) {
    res.json(payroll);
  } else {
    res.status(404).send('Payroll record not found');
  }
});

// Create a new payroll record
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const payroll = await Payroll.create(req.body);
  res.status(201).json(payroll);
});

// Update a payroll record by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const payroll = await Payroll.findByPk(req.params.id);
  if (payroll) {
    await payroll.update(req.body);
    res.json(payroll);
  } else {
    res.status(404).send('Payroll record not found');
  }
});

// Delete a payroll record by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const payroll = await Payroll.findByPk(req.params.id);
  if (payroll) {
    await payroll.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Payroll record not found');
  }
});

module.exports = router;
