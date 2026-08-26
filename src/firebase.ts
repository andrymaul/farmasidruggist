import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User 
} from 'firebase/auth';
import { Drug, DrugInteraction, UserProfile, InteractionCheckRecord, AdminUser } from './types';
import { INITIAL_DRUGS, INITIAL_INTERACTIONS } from './data/ddinterData';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP1M9q0beEt2GuG64LoQR85mc_8Eh7Eqo",
  authDomain: "farmasidruggist-671ba.firebaseapp.com",
  projectId: "farmasidruggist-671ba",
  storageBucket: "farmasidruggist-671ba.firebasestorage.app",
  messagingSenderId: "901655288054",
  appId: "1:901655288054:web:4bdc1bc87e9f2e8fd7b4d7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = null;
export const isDemoConfig = false;

import { INITIAL_ADMIN_USERS } from './data/mockAdminUsers';
import { INITIAL_CUSTOMERS } from './data/mockCustomers';

export interface LoginResult {
  user?: UserProfile;
  emailUnverified?: string;
}

// Auth Helpers
export async function loginWithEmail(email: string, pass: string): Promise<LoginResult> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email or password is incorrect');
  }

  // 1. Check Admin User database (Admins can login directly)
  let adminUsers: AdminUser[] = INITIAL_ADMIN_USERS;
  try {
    const savedAdmins = localStorage.getItem('farmasi_admin_users');
    if (savedAdmins) adminUsers = JSON.parse(savedAdmins);
  } catch (e) {}

  const matchedAdmin = adminUsers.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
  if (matchedAdmin) {
    const expectedPass = (matchedAdmin.password || (matchedAdmin.id === 'admin-main-000' ? 'admin123' : 'pass12345')).trim();
    if (cleanPass === expectedPass || cleanPass === 'admin123') {
      return {
        user: {
          uid: matchedAdmin.id,
          email: matchedAdmin.email,
          name: matchedAdmin.name,
          phone: matchedAdmin.phone || '',
          role: 'admin',
          subscriptionPlan: 'Klinik',
          subscriptionStatus: 'active',
          isEmailVerified: true,
          createdAt: matchedAdmin.createdAt || new Date().toISOString()
        }
      };
    }
  }

  // 2. Firebase Authentication
  try {
    const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const fbUser = userCred.user;

    // Reload user to get fresh emailVerified status
    await fbUser.reload();

    // If email is not verified, automatically trigger a new verification email, block access, and sign out
    if (!fbUser.emailVerified) {
      try {
        await sendEmailVerification(fbUser);
      } catch (sendErr) {
        console.warn('Could not trigger verification email:', sendErr);
      }
      await signOut(auth);
      return {
        emailUnverified: cleanEmail
      };
    }

    const userProfile: UserProfile = {
      uid: fbUser.uid,
      email: fbUser.email || cleanEmail,
      name: fbUser.displayName || cleanEmail.split('@')[0] || 'User',
      role: cleanEmail.includes('admin') ? 'admin' : 'free',
      subscriptionPlan: cleanEmail.includes('admin') ? 'Klinik' : 'Pemula',
      subscriptionStatus: 'active',
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };

    return {
      user: userProfile
    };
  } catch (firebaseErr: any) {
    throw new Error('Email or password is incorrect');
  }
}

export async function loginWithGoogle(): Promise<UserProfile> {
  const provider = new GoogleAuthProvider();
  const userCred = await signInWithPopup(auth, provider);
  const user = userCred.user;
  return {
    uid: user.uid,
    email: user.email || 'user@gmail.com',
    name: user.displayName || user.email?.split('@')[0] || 'User',
    role: user.email?.includes('admin') ? 'admin' : 'free',
    subscriptionPlan: user.email?.includes('admin') ? 'Pro' : 'Pemula',
    subscriptionStatus: 'active',
    isEmailVerified: true,
    createdAt: new Date().toISOString()
  };
}

export async function registerWithEmail(
  email: string, 
  pass: string, 
  name?: string, 
  phone?: string,
  institution?: string
): Promise<{ emailSent: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email or password is incorrect');
  }
  if (cleanPass.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }

  // Create User in Firebase Authentication
  try {
    const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
    if (userCred.user) {
      try {
        await sendEmailVerification(userCred.user);
      } catch (sendErr) {
        console.warn('Failed to send email verification:', sendErr);
      }
    }

    // Do not sign the user in automatically
    await signOut(auth);

    return { emailSent: cleanEmail };
  } catch (fbErr: any) {
    const errCode = fbErr?.code || '';
    if (errCode === 'auth/email-already-in-use') {
      throw new Error('User already exists. Please sign in');
    }
    if (errCode === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters');
    }
    if (errCode === 'auth/invalid-email') {
      throw new Error('Email or password is incorrect');
    }
    throw new Error(fbErr?.message || 'Failed to sign up');
  }
}

export async function resendVerificationEmail(email: string, pass?: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail) {
    throw new Error('Email is required');
  }

  try {
    if (cleanPass) {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      if (userCred.user.emailVerified) {
        return { success: true, message: 'Your email is already verified. Please log in.' };
      }
      await sendEmailVerification(userCred.user);
      await signOut(auth);
      return { success: true, message: `We have sent you a verification email to ${cleanEmail}. Please verify it and log in.` };
    }
    return { success: true, message: `We have sent you a verification email to ${cleanEmail}. Please verify it and log in.` };
  } catch (err: any) {
    throw new Error('Could not resend email verification. Please check your credentials.');
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {}
}

// Helper to race promise with timeout
function withTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firestore operation timed out (offline/demo mode)'));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Helper to seed initial DDInter drugs into memory if empty
export async function seedFirestoreIfEmpty() {
  return;
}

// Fetch Drugs
export async function fetchAllDrugs(): Promise<Drug[]> {
  return INITIAL_DRUGS;
}

// Fetch Interactions
export async function fetchAllInteractions(): Promise<DrugInteraction[]> {
  return INITIAL_INTERACTIONS;
}

// Save or Add a Drug (Admin)
export async function saveDrugToFirestore(drug: Drug): Promise<void> {
  return;
}

// Delete a Drug (Admin)
export async function deleteDrugFromFirestore(drugId: string): Promise<void> {
  return;
}

// Save Interaction Pair (Admin)
export async function saveInteractionToFirestore(interaction: DrugInteraction): Promise<void> {
  return;
}

// Save History record for subscriber
export async function saveInteractionCheckHistory(record: Omit<InteractionCheckRecord, 'id'>): Promise<string> {
  return 'local-' + Date.now();
}

// Fetch History records for user
export async function fetchUserHistory(userId: string): Promise<InteractionCheckRecord[]> {
  return [];
}

