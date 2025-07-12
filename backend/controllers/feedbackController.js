const { db } = require('../config/firebase');
const { Timestamp } = require('firebase-admin/firestore');

exports.createFeedback = async (req, res) => {
  try {
    const { swapId, reviewerId, recipientId, rating, comment } = req.body;
    const feedbackRef = db.collection('feedback').doc();
    await feedbackRef.set({
      swapId,
      reviewerId,
      recipientId,
      rating,
      comment,
      createdAt: Timestamp.now(),
    });
    res.status(201).json({ message: 'Feedback created', id: feedbackRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeedbackBySwap = async (req, res) => {
  try {
    const { swapId } = req.params;
    const snapshot = await db.collection('feedback').where('swapId', '==', swapId).get();
    const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};