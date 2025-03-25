const express = require('express');
const router = express.Router();
const { Product } = require('../models'); 
const authenticateToken = require('../middleware/auth');  // Corrected import
const authorizeRole = require('../middleware/authorizeRole'); // Corrected import

// Get all products
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get a single product by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Create a new product
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Update a product by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Delete a product by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;