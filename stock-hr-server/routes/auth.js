const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const authenticateToken = require('../middleware/auth'); // ✅ FIXED
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: "Invalid username or password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// ✅ Now this will work because authenticateToken is defined!
router.get('/me', authenticateToken, (req, res) => {
    res.json({ id: req.user.id, role: req.user.role });
});

module.exports = router;
