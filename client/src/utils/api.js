import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where, limit, startAfter } from 'firebase/firestore';
import { validateInput } from './validateInput';

const auth = getAuth();
const db = getFirestore();

// Authentication APIs
export const loginUser = async (email, password) => {
  if (!validateInput({ email, password })) {
    throw new Error('Invalid email or password');
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signupUser = async (email, password, name) => {
  if (!validateInput({ email, password, name })) {
    throw new Error('Invalid input');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      location: '',
      availability: '',
      isPublic: true,
      role: 'user',
      isBanned: false,
      createdAt: new Date(),
    });
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Skill APIs
export const fetchSkills = async (searchTerm = '', filterType = 'all', page = 1, perPage = 10, lastDoc = null) => {
  try {
    let q = collection(db, 'skills');
    if (searchTerm) {
      q = query(q, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
    }
    if (filterType !== 'all') {
      q = query(q, where('type', '==', filterType));
    }
    q = query(q, limit(perPage));
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    const snapshot = await getDocs(q);
    const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { skills, lastDoc: snapshot.docs[snapshot.docs.length - 1] };
  } catch (error) {
    console.error('Fetch Skills Error:', error);
    throw new Error('Failed to fetch skills');
  }
};

export const addSkill = async (userId, skillData) => {
  if (!validateInput(skillData)) {
    throw new Error('Invalid skill data');
  }
  try {
    const skillId = `${userId}_${Date.now()}`;
    await setDoc(doc(db, 'skills', skillId), {
      ...skillData,
      userId,
      createdAt: new Date(),
    });
    return skillId;
  } catch (error) {
    console.error('Add Skill Error:', error);
    throw new Error('Failed to add skill');
  }
};

// Swap Request APIs
export const requestSwap = async (userId, skill) => {
  if (!userId || !skill) {
    throw new Error('Invalid user or skill');
  }
  try {
    const swapId = `${userId}_${skill.id}_${Date.now()}`;
    await setDoc(doc(db, 'swaps', swapId), {
      requesterId: userId,
      recipientId: skill.userId,
      offeredSkillId: null,
      wantedSkillId: skill.id,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return swapId;
  } catch (error) {
    console.error('Request Swap Error:', error);
    throw new Error('Failed to request swap');
  }
};

export const updateSwapStatus = async (swapId, status) => {
  if (!['pending', 'accepted', 'rejected', 'cancelled'].includes(status)) {
    throw new Error('Invalid status');
  }
  try {
    await updateDoc(doc(db, 'swaps', swapId), {
      status,
      updatedAt: new Date(),
    });
    return swapId;
  } catch (error) {
    console.error('Update Swap Error:', error);
    throw new Error('Failed to update swap');
  }
};

// Feedback APIs
export const submitFeedback = async (userId, swapId, rating, comment) => {
  if (!validateInput({ rating, comment })) {
    throw new Error('Invalid feedback data');
  }
  try {
    const feedbackId = `${swapId}_${userId}`;
    await setDoc(doc(db, 'feedback', feedbackId), {
      swapId,
      reviewerId: userId,
      rating,
      comment,
      createdAt: new Date(),
    });
    return feedbackId;
  } catch (error) {
    console.error('Submit Feedback Error:', error);
    throw new Error('Failed to submit feedback');
  }
};

// Notification APIs
export const fetchNotifications = async (userId) => {
  try {
    const q = query(collection(db, 'notifications'), where('recipientId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Fetch Notifications Error:', error);
    throw new Error('Failed to fetch notifications');
  }
};

// Admin APIs
export const banUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isBanned: true,
      updatedAt: new Date(),
    });
    return userId;
  } catch (error) {
    console.error('Ban User Error:', error);
    throw new Error('Failed to ban user');
  }
};