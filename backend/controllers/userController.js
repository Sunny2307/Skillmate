const { db, admin } = require('../config/firebase');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

const otpStore = new Map(); // Temporary in-memory store for OTPs (use Redis in production)

exports.createUser = async (req, res) => {
  try {
    const { name, location, profilePhoto, isPublic, availability, role, isBanned } = req.body;
    const userRef = db.collection('users').doc(req.user.uid);
    await userRef.set({
      name,
      location,
      profilePhoto,
      isPublic: isPublic ?? true,
      availability,
      role: role ?? 'user',
      isBanned: isBanned ?? false,
    });
    res.status(201).json({ message: 'User created', uid: req.user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const doc = await userRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'User not found' });
    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, location, profilePhoto, isPublic, availability, role, isBanned } = req.body;
    const userRef = db.collection('users').doc(req.user.uid);
    await userRef.update({
      name,
      location,
      profilePhoto,
      isPublic,
      availability,
      role,
      isBanned,
    });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    await userRef.delete();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    otpStore.set(email, { otp, createdAt: Date.now() });

    console.log('Sending OTP to:', email, 'with OTP:', otp);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for SkillSwap Registration',
      text: `Your OTP is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp || Date.now() - storedOtp.createdAt > 10 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP expired or invalid' });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    otpStore.delete(email);
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Check if user already exists in Firebase Authentication
    try {
      await admin.auth().getUserByEmail(email);
      return res.status(400).json({ error: 'User with this email already exists' });
    } catch (authError) {
      if (authError.code !== 'auth/user-not-found') {
        throw authError; // Re-throw other errors
      }
      // User does not exist, proceed with signup
    }

    // Generate a temporary password (e.g., a random string)
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      displayName: name,
    });

    const userRef = db.collection('users').doc(userRecord.uid);
    const userDoc = await userRef.get();
    const isNewUser = !userDoc.exists;

    if (isNewUser) {
      await userRef.set({
        name,
        isPublic: true,
        role: 'user',
        isBanned: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        profileComplete: false, // Flag to indicate profile (password, availability) is pending
      });
    }

    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.status(201).json({
      message: isNewUser ? 'New user registered, complete your profile' : 'User profile updated',
      uid: userRecord.uid,
      token,
      isNewUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    const userRef = db.collection('users').doc(userRecord.uid);
    const userDoc = await userRef.get();
    const isNewUser = !userDoc.exists || !userDoc.data().profileComplete;

    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({
      message: 'User logged in',
      uid: userRecord.uid,
      token,
      isNewUser,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid email or password' });
  }
};