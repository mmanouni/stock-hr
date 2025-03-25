const express = require('express');
const router = express.Router();
const { Sale } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all sales
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const sales = await Sale.findAll();
  res.json(sales);
});

// Get a single sale by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    res.json(sale);
  } else {
    res.status(404).send('Sale not found');
  }
});

// Create a new sale
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const sale = await Sale.create(req.body);
  res.status(201).json(sale);
});

// Update a sale by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    await sale.update(req.body);
    res.json(sale);
  } else {
    res.status(404).send('Sale not found');
  }
});

// Delete a sale by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    await sale.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Sale not found');
  }
});

module.exports = router;
