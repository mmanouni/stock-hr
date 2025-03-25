// File: index.js (root of stock-hr-server)
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('./models');
const winston = require('winston');
const errorHandler = require('./middleware/errorHandler');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// Public routes (do not require authentication)
app.use('/api/auth', require('./routes/auth'));

// (Optional) Add a public health-check route:
app.get('/', (req, res) => {
  res.send('Server is running');
});

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

// Protected routes (authentication required)
app.use('/api/products', authenticateToken, require('./routes/products'));
app.use('/api/suppliers', authenticateToken, require('./routes/suppliers'));
app.use('/api/categories', authenticateToken, require('./routes/categories'));
app.use('/api/purchaseOrders', authenticateToken, require('./routes/purchaseOrders'));
app.use('/api/sales', authenticateToken, require('./routes/sales'));
app.use('/api/employees', authenticateToken, require('./routes/employees'));
app.use('/api/payroll', authenticateToken, require('./routes/payroll'));
app.use('/api/attendance', authenticateToken, require('./routes/attendance'));
app.use('/api/evaluations', authenticateToken, require('./routes/evaluations'));
app.use('/api/recruitment', authenticateToken, require('./routes/recruitment'));
app.use('/api/applicants', authenticateToken, require('./routes/applicants'));
app.use('/api/interviews', authenticateToken, require('./routes/interviews'));
app.use('/api/departments', authenticateToken, require('./routes/departments'));

// Error handling middleware
app.use(errorHandler);

// Start the server after syncing the Sequelize models
sequelize.sync().then(() => {
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}).catch(err => {
  logger.error('Unable to connect to the database:', err);
});

process.on('uncaughtException', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use. Please use a different port.`);
  } else {
    logger.error('Uncaught Exception:', err);
  }
});

module.exports = app;
