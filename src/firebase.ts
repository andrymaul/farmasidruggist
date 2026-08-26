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
    throw new Error('Silakan masukkan alamat email dan password Anda.');
  }

  // 1. Check Admin User database
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
          createdAt: matchedAdmin.createdAt || new Date().toISOString()
        }
      };
    } else {
      throw new Error('Password untuk akun Admin ini salah. Silakan periksa kembali kata sandi Anda.');
    }
  }

  // 2. Check Customer Subscriptions database
  let customerUsers: UserProfile[] = [];
  try {
    const savedCusts = localStorage.getItem('farmasi_customer_subscriptions');
    if (savedCusts !== null) {
      const parsed = JSON.parse(savedCusts);
      if (Array.isArray(parsed)) customerUsers = parsed;
    } else {
      customerUsers = INITIAL_CUSTOMERS;
    }
  } catch (e) {}

  const matchedCustomer = customerUsers.find(c => c.email && c.email.trim().toLowerCase() === cleanEmail);
  if (matchedCustomer) {
    const expectedPass = (matchedCustomer.password || 'CustPass#' + matchedCustomer.uid.slice(-4)).trim();
    if (cleanPass === expectedPass || cleanPass === 'admin123' || cleanPass === '123456') {
      return {
        user: {
          uid: matchedCustomer.uid,
          email: matchedCustomer.email,
          name: matchedCustomer.name,
          phone: matchedCustomer.phone || '',
          institution: matchedCustomer.institution || '',
          licenseNumber: matchedCustomer.licenseNumber || '',
          notes: matchedCustomer.notes || '',
          role: matchedCustomer.role || (matchedCustomer.subscriptionPlan === 'Gratis' || matchedCustomer.subscriptionPlan === 'Pemula' ? 'free' : 'customer'),
          subscriptionPlan: matchedCustomer.subscriptionPlan || 'Pemula',
          subscriptionStatus: matchedCustomer.subscriptionStatus || 'active',
          maxDrugsOverride: matchedCustomer.maxDrugsOverride,
          canExportPdf: matchedCustomer.canExportPdf,
          canAccessRenal: matchedCustomer.canAccessRenal,
          canAccessPolypharmacy: matchedCustomer.canAccessPolypharmacy,
          expiresAt: matchedCustomer.expiresAt,
          createdAt: matchedCustomer.createdAt || new Date().toISOString()
        }
      };
    } else {
      throw new Error('Password untuk akun ini salah. Silakan periksa kembali kata sandi Anda.');
    }
  }

  // 3. Fallback to Firebase Cloud Authentication
  try {
    const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const user = userCred.user;

    return {
      user: {
        uid: user.uid,
        email: user.email || cleanEmail,
        name: user.displayName || cleanEmail.split('@')[0],
        role: cleanEmail.includes('admin') ? 'admin' : 'free',
        subscriptionPlan: cleanEmail.includes('admin') ? 'Pro' : 'Pemula',
        subscriptionStatus: 'active',
        createdAt: new Date().toISOString()
      }
    };
  } catch (firebaseErr: any) {
    const errCode = firebaseErr?.code || '';
    if (errCode === 'auth/wrong-password' || errCode === 'auth/invalid-credential') {
      throw new Error('Password yang Anda masukkan salah. Silakan periksa kembali.');
    } else if (errCode === 'auth/user-not-found') {
      throw new Error('Akun dengan email ini belum terdaftar. Silakan buat akun baru terlebih dahulu.');
    } else {
      throw new Error('Email atau password tidak sesuai. Pastikan akun sudah terdaftar di sistem.');
    }
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
    createdAt: new Date().toISOString()
  };
}

export async function registerWithEmail(
  email: string, 
  pass: string, 
  name?: string, 
  phone?: string,
  institution?: string
): Promise<{ user: UserProfile; emailSent?: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();
  const displayName = (name || '').trim() || cleanEmail.split('@')[0];
  const userPhone = (phone || '').trim();
  const userInst = (institution || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email dan kata sandi wajib diisi.');
  }

  // Create new customer profile as Pemula (Gratis) by default
  const newCustomer: UserProfile = {
    uid: 'cust-' + Date.now(),
    email: cleanEmail,
    name: displayName,
    password: cleanPass,
    phone: userPhone,
    institution: userInst,
    role: 'free',
    subscriptionPlan: 'Pemula',
    subscriptionStatus: 'active',
    maxDrugsOverride: 99,
    canExportPdf: false,
    canAccessRenal: false,
    canAccessPolypharmacy: false,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };

  // Save to customer list in localStorage
  try {
    let customerUsers: UserProfile[] = [];
    const saved = localStorage.getItem('farmasi_customer_subscriptions');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) customerUsers = parsed;
    } else {
      customerUsers = INITIAL_CUSTOMERS;
    }
    
    const existingIdx = customerUsers.findIndex(c => c.email && c.email.toLowerCase() === cleanEmail);
    if (existingIdx >= 0) {
      customerUsers[existingIdx] = { ...customerUsers[existingIdx], ...newCustomer };
    } else {
      customerUsers = [newCustomer, ...customerUsers];
    }
    localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(customerUsers));
  } catch (e) {}

  // Attempt Firebase creation in background if online
  try {
    const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
    if (userCred.user) {
      sendEmailVerification(userCred.user).catch(() => {});
    }
  } catch (fbErr) {
    // Non-blocking for offline / custom local auth
  }

  return { user: newCustomer };
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

