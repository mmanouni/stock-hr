const express = require('express');
const router = express.Router();
const { Recruitment } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all recruitment records
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const recruitments = await Recruitment.findAll();
  res.json(recruitments);
});

// Get a single recruitment record by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const recruitment = await Recruitment.findByPk(req.params.id);
  if (recruitment) {
    res.json(recruitment);
  } else {
    res.status(404).send('Recruitment record not found');
  }
});

// Create a new recruitment record
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const recruitment = await Recruitment.create(req.body);
  res.status(201).json(recruitment);
});

// Update a recruitment record by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const recruitment = await Recruitment.findByPk(req.params.id);
  if (recruitment) {
    await recruitment.update(req.body);
    res.json(recruitment);
  } else {
    res.status(404).send('Recruitment record not found');
  }
});

// Delete a recruitment record by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const recruitment = await Recruitment.findByPk(req.params.id);
  if (recruitment) {
    await recruitment.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Recruitment record not found');
  }
});

module.exports = router;
