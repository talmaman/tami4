const express = require('express');
const candidates = require('./routes/candidates');
const auth = require('./routes/auth');
const router = express.Router();

router.use('/auth', auth);
router.use('/candidates', candidates);

module.exports = router;