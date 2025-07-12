const { db } = require('../config/firebase');

exports.createSkill = async (req, res) => {
  try {
    const { userId, type, name, description } = req.body;
    const skillRef = db.collection('skills').doc();
    await skillRef.set({
      userId,
      type,
      name,
      description,
    });
    res.status(201).json({ message: 'Skill created', id: skillRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSkillsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('skills').where('userId', '==', userId).get();
    const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('skills').doc(id).delete();
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};