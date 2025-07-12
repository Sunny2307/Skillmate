const express = require('express');
const router = express.Router();
const { createNotification, getNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');
const { validateNotification } = require('../middleware/validate');

router.post('/notifications', authMiddleware, validateNotification, createNotification);
router.get('/notifications', authMiddleware, getNotifications);

module.exports = router;