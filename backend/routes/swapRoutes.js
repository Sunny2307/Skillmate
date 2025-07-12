const express = require('express');
const router = express.Router();
const { createSwap, updateSwapStatus, getSwapsByUser } = require('../controllers/swapController');
const authMiddleware = require('../middleware/auth');
const { validateSwap } = require('../middleware/validate');

router.post('/swaps', authMiddleware, validateSwap, createSwap);
router.put('/swaps/:id', authMiddleware, updateSwapStatus);
router.get('/swaps/:userId', authMiddleware, getSwapsByUser);

module.exports = router;