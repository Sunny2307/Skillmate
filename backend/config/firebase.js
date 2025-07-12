const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || 'skillmate-8c645'}.firebaseio.com`
});

const db = admin.firestore();
module.exports = { db, admin };