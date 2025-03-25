const express = require('express');
const router = express.Router();
const { Category } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all categories
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

// Get a single category by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).send('Category not found');
  }
});

// Create a new category
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

// Update a category by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    await category.update(req.body);
    res.json(category);
  } else {
    res.status(404).send('Category not found');
  }
});

// Delete a category by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (category) {
    await category.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Category not found');
  }
});

module.exports = router;
