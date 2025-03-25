const express = require('express');
const { License } = require('../models');
const router = express.Router();

router.post('/activate', async (req, res) => {
    const { key } = req.body;
    try {
        const license = await License.findOne({ where: { key } });
        if (license) {
            license.active = true;
            await license.save();
            res.status(200).send('License activated');
        } else {
            res.status(404).send('License not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
