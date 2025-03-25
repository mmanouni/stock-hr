const express = require('express');
const router = express.Router();
const { Applicant } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all applicants
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const applicants = await Applicant.findAll();
  res.json(applicants);
});

// Get a single applicant by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const applicant = await Applicant.findByPk(req.params.id);
  if (applicant) {
    res.json(applicant);
  } else {
    res.status(404).send('Applicant not found');
  }
});

// Create a new applicant
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const applicant = await Applicant.create(req.body);
  res.status(201).json(applicant);
});

// Update an applicant by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const applicant = await Applicant.findByPk(req.params.id);
  if (applicant) {
    await applicant.update(req.body);
    res.json(applicant);
  } else {
    res.status(404).send('Applicant not found');
  }
});

// Delete an applicant by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const applicant = await Applicant.findByPk(req.params.id);
  if (applicant) {
    await applicant.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Applicant not found');
  }
});

module.exports = router;
