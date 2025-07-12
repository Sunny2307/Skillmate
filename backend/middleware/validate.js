const validateUser = (req, res, next) => {
  const { name, availability } = req.body;
  if (!name || !availability) {
    return res.status(400).json({ error: 'Name and availability are required' });
  }
  next();
};

const validateSkill = (req, res, next) => {
  const { userId, type, name, description } = req.body;
  if (!userId || !type || !name || !description) {
    return res.status(400).json({ error: 'All skill fields are required' });
  }
  if (!['offered', 'wanted'].includes(type)) {
    return res.status(400).json({ error: 'Invalid skill type' });
  }
  next();
};

const validateSwap = (req, res, next) => {
  const { requesterId, recipientId, offeredSkillId, wantedSkillId } = req.body;
  if (!requesterId || !recipientId || !offeredSkillId || !wantedSkillId) {
    return res.status(400).json({ error: 'All swap fields are required' });
  }
  next();
};

const validateFeedback = (req, res, next) => {
  const { swapId, reviewerId, recipientId, rating, comment } = req.body;
  if (!swapId || !reviewerId || !recipientId || rating == null || !comment) {
    return res.status(400).json({ error: 'All feedback fields are required' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  next();
};

const validateNotification = (req, res, next) => {
  const { message, target } = req.body;
  if (!message || !target) {
    return res.status(400).json({ error: 'Message and target are required' });
  }
  next();
};

module.exports = { validateUser, validateSkill, validateSwap, validateFeedback, validateNotification };