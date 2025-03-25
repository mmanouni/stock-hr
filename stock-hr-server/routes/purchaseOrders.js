const express = require('express');
const router = express.Router();
const { PurchaseOrder } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all purchase orders
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const purchaseOrders = await PurchaseOrder.findAll();
  res.json(purchaseOrders);
});

// Get a single purchase order by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
  if (purchaseOrder) {
    res.json(purchaseOrder);
  } else {
    res.status(404).send('Purchase Order not found');
  }
});

// Create a new purchase order
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const purchaseOrder = await PurchaseOrder.create(req.body);
  res.status(201).json(purchaseOrder);
});

// Update a purchase order by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
  if (purchaseOrder) {
    await purchaseOrder.update(req.body);
    res.json(purchaseOrder);
  } else {
    res.status(404).send('Purchase Order not found');
  }
});

// Delete a purchase order by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
  if (purchaseOrder) {
    await purchaseOrder.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Purchase Order not found');
  }
});

module.exports = router;
