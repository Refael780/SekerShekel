const express = require('express');
const router = express.Router();

// @route   GET api/sekers
// @desc    Test route
// @access  Public

router.get('/', (req, res) => res.send('Sekers route'));

module.exports = router;
