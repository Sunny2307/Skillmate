const express = require('express');
const router = express.Router();
const { createSkill, getSkillsByUser, deleteSkill } = require('../controllers/skillController');
const authMiddleware = require('../middleware/auth');
const { validateSkill } = require('../middleware/validate');

router.post('/skills', authMiddleware, validateSkill, createSkill);
router.get('/skills/:userId', authMiddleware, getSkillsByUser);
router.delete('/skills/:id', authMiddleware, deleteSkill);

module.exports = router;