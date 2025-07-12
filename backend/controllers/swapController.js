const { db } = require('../config/firebase');
const { Timestamp } = require('firebase-admin/firestore');

exports.createSwap = async (req, res) => {
  try {
    const { requesterId, recipientId, offeredSkillId, wantedSkillId } = req.body;
    const swapRef = db.collection('swaps').doc();
    await swapRef.set({
      requesterId,
      recipientId,
      offeredSkillId,
      wantedSkillId,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    res.status(201).json({ message: 'Swap request created', id: swapRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSwapStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['accepted', 'rejected', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const swapRef = db.collection('swaps').doc(id);
    await swapRef.update({
      status,
      updatedAt: Timestamp.now(),
    });
    res.json({ message: 'Swap status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSwapsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('swaps')
      .where('requesterId', '==', userId)
      .get();
    const swaps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};