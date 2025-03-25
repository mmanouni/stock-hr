const express = require('express');
const router = express.Router();
const { Evaluation } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all evaluations
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const evaluations = await Evaluation.findAll();
  res.json(evaluations);
});

// Get a single evaluation by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const evaluation = await Evaluation.findByPk(req.params.id);
  if (evaluation) {
    res.json(evaluation);
  } else {
    res.status(404).send('Evaluation not found');
  }
});

// Create a new evaluation
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const evaluation = await Evaluation.create(req.body);
  res.status(201).json(evaluation);
});

// Update an evaluation by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const evaluation = await Evaluation.findByPk(req.params.id);
  if (evaluation) {
    await evaluation.update(req.body);
    res.json(evaluation);
  } else {
    res.status(404).send('Evaluation not found');
  }
});

// Delete an evaluation by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const evaluation = await Evaluation.findByPk(req.params.id);
  if (evaluation) {
    await evaluation.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Evaluation not found');
  }
});

module.exports = router;
