const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser, signup, login, sendOtp, verifyOtp } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { validateUser } = require('../middleware/validate');

router.post('/users', authMiddleware, validateUser, createUser);
router.get('/users/me', authMiddleware, getUser);
router.put('/users/me', authMiddleware, validateUser, updateUser);
router.delete('/users/me', authMiddleware, deleteUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;