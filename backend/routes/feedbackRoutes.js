const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbackBySwap } = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/auth');
const { validateFeedback } = require('../middleware/validate');

router.post('/feedback', authMiddleware, validateFeedback, createFeedback);
router.get('/feedback/:swapId', authMiddleware, getFeedbackBySwap);

module.exports = router;