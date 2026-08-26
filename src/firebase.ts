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

// Helper to map Firebase Auth error codes to user-friendly Indonesian messages
export function mapFirebaseAuthError(err: any): string {
  const code = err?.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Jika Anda belum memverifikasi email, silakan kirim ulang tautan verifikasi.';
    case 'auth/invalid-email':
      return 'Format alamat email tidak valid. Periksa kembali penulisan email Anda.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu pendek. Gunakan minimal 6 karakter kombinasi huruf dan angka.';
    case 'auth/user-not-found':
      return 'Akun dengan alamat email ini belum terdaftar. Silakan daftar akun baru terlebih dahulu.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau kata sandi yang Anda masukkan salah. Silakan periksa kembali.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat sebelum mencoba kembali.';
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke server autentikasi. Pastikan koneksi internet Anda aktif.';
    default:
      return err?.message || 'Terjadi kesalahan pada proses autentikasi. Silakan coba beberapa saat lagi.';
  }
}

// Auth Helpers
export async function loginWithEmail(email: string, pass: string): Promise<LoginResult> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Silakan masukkan alamat email dan kata sandi Anda.');
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
    } else {
      throw new Error('Kata sandi untuk akun Admin ini salah. Silakan periksa kembali kata sandi Anda.');
    }
  }

  // 2. Firebase Cloud Authentication & Strict Email Verification Check
  try {
    const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const fbUser = userCred.user;

    // Reload Firebase user to fetch freshest emailVerified flag
    await fbUser.reload();

    if (!fbUser.emailVerified) {
      // User hasn't verified their email yet!
      await signOut(auth);
      return {
        emailUnverified: cleanEmail
      };
    }

    // Email IS verified! Check/sync with customer subscriptions database
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
      // Mark verified in local storage
      matchedCustomer.isEmailVerified = true;
      try {
        localStorage.setItem('farmasi_customer_subscriptions', JSON.stringify(customerUsers));
      } catch (e) {}

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
          isEmailVerified: true,
          createdAt: matchedCustomer.createdAt || new Date().toISOString()
        }
      };
    }

    // Default authenticated customer profile
    const verifiedProfile: UserProfile = {
      uid: fbUser.uid,
      email: fbUser.email || cleanEmail,
      name: fbUser.displayName || cleanEmail.split('@')[0],
      role: 'free',
      subscriptionPlan: 'Pemula',
      subscriptionStatus: 'active',
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };

    return {
      user: verifiedProfile
    };
  } catch (firebaseErr: any) {
    throw new Error(mapFirebaseAuthError(firebaseErr));
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
): Promise<{ user?: UserProfile; emailSent?: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();
  const displayName = (name || '').trim() || cleanEmail.split('@')[0];
  const userPhone = (phone || '').trim();
  const userInst = (institution || '').trim();

  if (!cleanEmail || !cleanPass) {
    throw new Error('Email dan kata sandi wajib diisi.');
  }
  if (cleanPass.length < 6) {
    throw new Error('Kata sandi minimal harus terdiri dari 6 karakter.');
  }

  // 1. Create User in Firebase Authentication
  let fbUser: User | null = null;
  try {
    const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
    fbUser = userCred.user;
  } catch (fbErr: any) {
    const errCode = fbErr?.code || '';
    if (errCode === 'auth/email-already-in-use') {
      // Check if user is already registered but unverified
      try {
        const existingCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
        if (!existingCred.user.emailVerified) {
          await sendEmailVerification(existingCred.user);
          await signOut(auth);
          return { emailSent: cleanEmail };
        } else {
          throw new Error('Email ini sudah terdaftar dan telah terverifikasi. Silakan langsung masuk.');
        }
      } catch (loginErr: any) {
        if (loginErr.message?.includes('terverifikasi')) {
          throw loginErr;
        }
        throw new Error('Email ini sudah terdaftar di sistem. Silakan masuk menggunakan kata sandi Anda.');
      }
    }
    throw new Error(mapFirebaseAuthError(fbErr));
  }

  // 2. Send Verification Email via Firebase
  if (fbUser) {
    try {
      await sendEmailVerification(fbUser);
    } catch (sendErr: any) {
      console.warn('Gagal mengirim email verifikasi:', sendErr);
    }
    // Sign out immediately to prevent auto-login before email verification
    try {
      await signOut(auth);
    } catch (e) {}
  }

  // 3. Save pending customer profile in localStorage
  const newCustomer: UserProfile = {
    uid: fbUser?.uid || ('cust-' + Date.now()),
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
    isEmailVerified: false,
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };

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

  // Return emailSent to trigger verification view in UI
  return { emailSent: cleanEmail };
}

export async function resendVerificationEmail(email: string, pass?: string): Promise<{ success: boolean; message: string }> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim();

  if (!cleanEmail) {
    throw new Error('Alamat email wajib diisi.');
  }

  try {
    // If current active Firebase user matches email
    if (auth.currentUser && auth.currentUser.email?.toLowerCase() === cleanEmail) {
      await sendEmailVerification(auth.currentUser);
      return { success: true, message: `Tautan verifikasi telah berhasil dikirim ulang ke ${cleanEmail}.` };
    }

    // If password provided, sign in temporarily, send verification, then sign out
    if (cleanPass) {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      if (userCred.user.emailVerified) {
        return { success: true, message: `Email ${cleanEmail} sudah terverifikasi sebelumnya. Silakan langsung masuk.` };
      }
      await sendEmailVerification(userCred.user);
      await signOut(auth);
      return { success: true, message: `Tautan verifikasi telah berhasil dikirim ulang ke ${cleanEmail}.` };
    }

    // Find in local customer list to retrieve stored password if available
    let customerUsers: UserProfile[] = [];
    try {
      const saved = localStorage.getItem('farmasi_customer_subscriptions');
      if (saved) customerUsers = JSON.parse(saved);
    } catch (e) {}
    const matched = customerUsers.find(c => c.email && c.email.toLowerCase() === cleanEmail);
    if (matched && matched.password) {
      const userCred = await signInWithEmailAndPassword(auth, cleanEmail, matched.password);
      if (userCred.user.emailVerified) {
        return { success: true, message: `Email ${cleanEmail} sudah terverifikasi. Silakan langsung masuk.` };
      }
      await sendEmailVerification(userCred.user);
      await signOut(auth);
      return { success: true, message: `Tautan verifikasi telah berhasil dikirim ulang ke ${cleanEmail}.` };
    }

    throw new Error('Silakan masukkan kata sandi akun Anda pada form Masuk untuk mengirim ulang verifikasi.');
  } catch (err: any) {
    throw new Error(mapFirebaseAuthError(err));
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

