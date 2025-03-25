const express = require('express');
const router = express.Router();
const { Supplier } = require('../models'); 
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!


// Get all suppliers
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const suppliers = await Supplier.findAll();
  res.json(suppliers);
});

// Get a single supplier by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const supplier = await Supplier.findByPk(req.params.id);
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).send('Supplier not found');
  }
});

// Create a new supplier
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json(supplier);
});

// Update a supplier by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const supplier = await Supplier.findByPk(req.params.id);
  if (supplier) {
    await supplier.update(req.body);
    res.json(supplier);
  } else {
    res.status(404).send('Supplier not found');
  }
});

// Delete a supplier by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const supplier = await Supplier.findByPk(req.params.id);
  if (supplier) {
    await supplier.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Supplier not found');
  }
});

module.exports = router;
