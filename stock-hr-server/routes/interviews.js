const express = require('express');
const router = express.Router();
const { Interview } = require('../models');
const authenticateToken = require('../middleware/auth');  // ✅ Fix this!
const authorizeRole = require('../middleware/authorizeRole'); // ✅ Fix this!

// Get all interviews
router.get('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const interviews = await Interview.findAll();
  res.json(interviews);
});

// Get a single interview by ID
router.get('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const interview = await Interview.findByPk(req.params.id);
  if (interview) {
    res.json(interview);
  } else {
    res.status(404).send('Interview not found');
  }
});

// Create a new interview
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const interview = await Interview.create(req.body);
  res.status(201).json(interview);
});

// Update an interview by ID
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const interview = await Interview.findByPk(req.params.id);
  if (interview) {
    await interview.update(req.body);
    res.json(interview);
  } else {
    res.status(404).send('Interview not found');
  }
});

// Delete an interview by ID
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const interview = await Interview.findByPk(req.params.id);
  if (interview) {
    await interview.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Interview not found');
  }
});

module.exports = router;
