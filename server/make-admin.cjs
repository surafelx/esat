require('dotenv').config({ path: './.env' });

const { auth, db } = require('./config/firebase');
const admin = require('firebase-admin');

async function makeAdmin() {
  try {
    // Find user by email
    const userRecord = await auth.getUserByEmail('workwithsurafel@gmail.com');
    
    console.log('Found user:', userRecord.email, 'UID:', userRecord.uid);
    
    // Create or update user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      role: 'admin',
      displayName: userRecord.displayName || 'Admin User',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    console.log('✅ Successfully set user as admin!');
    console.log('UID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
