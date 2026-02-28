require('dotenv').config({ path: './.env' });

const { auth, db } = require('./config/firebase');
const admin = require('firebase-admin');

async function makeInstructor(email) {
  if (!email) {
    console.log('Usage: node make-instructor.cjs <email>');
    console.log('Example: node make-instructor.cjs teacher@example.com');
    process.exit(1);
  }

  try {
    const userRecord = await auth.getUserByEmail(email);
    
    console.log('Found user:', userRecord.email, 'UID:', userRecord.uid);
    
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      role: 'instructor',
      displayName: userRecord.displayName || 'Instructor',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    console.log('✅ Successfully set user as instructor!');
    console.log('UID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

const email = process.argv[2];
makeInstructor(email);
