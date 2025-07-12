const { db } = require('../config/firebase');
const { Timestamp } = require('firebase-admin/firestore');

exports.createNotification = async (req, res) => {
  try {
    const { message, target } = req.body;
    const notificationRef = db.collection('notifications').doc();
    await notificationRef.set({
      message,
      target,
      createdAt: Timestamp.now(),
    });
    res.status(201).json({ message: 'Notification created', id: notificationRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const snapshot = await db.collection('notifications').get();
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};